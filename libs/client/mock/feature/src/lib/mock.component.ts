import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { CollectionsEntity, CollectionsFacade } from '@aymme/client/collection/data-access';
import { ProjectsEntity, ProjectsFacade } from '@aymme/client/projects/data-access';
import { EndpointFacade } from '@aymme/client/mock/data-access';
import { EndpointEntity, ResponseEntity } from '@aymme/client/mock/model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { ICollection } from '@aymme/shared/model';
import {
  ConfirmDeleteCollectionDialogComponent,
  CreateNewCollectionDialogComponent,
  ProjectConfigurationDialogComponent,
  ImportProjectDialogComponent,
} from './dialogs';
import { RenameCollectionDialogComponent } from './dialogs/rename-collection/rename-collection-dialog.component';

interface CompressedCollectionsEntity extends CollectionsEntity {
  compressed: boolean;
}

const POSITION = { top: '100px' };

@Component({
  selector: 'ay-mock',
  templateUrl: './mock.component.html',
  styleUrls: ['./mock.component.scss'],
  providers: [],
})
export class MockComponent {
  unsubscribe$: Subject<void> = new Subject();

  projectId: string = this.route.snapshot.parent?.parent?.params.projectId;
  form: FormGroup = this.fb.group({
    configuration: this.fb.group({
      delay: null,
      emptyArray: null,
      activeStatusCode: null,
      headers: this.fb.array([]),
      forward: null,
    }),

    responses: this.fb.array([]),
  });

  loaded$: Observable<boolean> = this.collectionsFacade.loaded$;
  collections$: Observable<CollectionsEntity[]> = this.collectionsFacade.allCollections$;
  selectedProject$: Observable<ProjectsEntity | undefined> = this.projectsFacade.selectedProject$;
  availableStatusCodes$: Observable<ResponseEntity[] | undefined> = this.endpointFacade.availableStatusCodes$;
  activeStatusCode$: Observable<ResponseEntity | undefined> = this.endpointFacade.activeStatusCode$;
  selectedEndpoint$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  endpoint$: Observable<EndpointEntity | undefined> = this.endpointFacade.endpoint$.pipe(
    tap((endpoint) => this._initializeForm(endpoint))
  );

  endpointLoaded$: Observable<boolean | null> = this.endpointFacade.loaded$;

  selectedResponseBody: string | undefined;
  selectedResponseId: string | number | undefined;

  constructor(
    private route: ActivatedRoute,
    private collectionsFacade: CollectionsFacade,
    private projectsFacade: ProjectsFacade,
    private endpointFacade: EndpointFacade,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.collectionsFacade.init(this.projectId);
  }

  updateEndpoint() {
    this.endpointFacade.updateEndpoint({
      ...this.configurationForm.value,
      delay: Number(this.configurationForm.value['delay']),
      responses: [...this.responseArrayForm.value],
    });
  }

  removeEndpoint(collectionId: string, endpointId: string) {
    this.endpointFacade.removeEndpoint(collectionId, endpointId);
  }

  toggleCompress(collection: CompressedCollectionsEntity) {
    const collectionUpdate = { ...collection, compressed: !collection.compressed };
    this.collectionsFacade.toggleCompressed(collectionUpdate);
  }

  onDropCollection(event: CdkDragDrop<string[]>) {
    const { container, previousIndex, currentIndex } = event;

    // don't update the endpoints if the endpoint is moved to the same index as it was.
    if (previousIndex === currentIndex) return;

    this.collectionsFacade.updateCollectionOrder({
      projectId: this.projectId,
      containerId: container.id,
      previousIndex,
      currentIndex,
    });
  }

  onDropEndpoint(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      const { container, previousIndex, currentIndex } = event;

      // don't update the endpoints if the endpoint is moved to the same index as it was.
      if (previousIndex === currentIndex) return;

      this.collectionsFacade.moveEndpointInCollection({
        projectId: this.projectId,
        containerId: container.id,
        previousIndex,
        currentIndex,
      });
    } else {
      const { container, previousContainer, previousIndex, currentIndex } = event;
      this.collectionsFacade.moveEndpointToOtherCollection({
        projectId: this.projectId,
        containerId: container.id,
        previousContainerId: previousContainer.id,
        previousIndex,
        currentIndex,
      });
    }
  }

  onEndpointSelect(id: string) {
    if (id === this.selectedEndpoint$.value) {
      return;
    }

    this.selectedEndpoint$.next(id);
    this.endpointFacade.loadEndpoint(id);
  }

  onViewResponseBody(index: number) {
    this.selectedResponseId = index;
    this.selectedResponseBody = this.responseArrayForm.at(index).get('body')?.value;
  }

  onUpdateResponse(content: string) {
    this.responseArrayForm.at(Number(this.selectedResponseId)).patchValue({
      body: content,
    });
  }

  get configurationForm(): FormGroup {
    return this.form.get('configuration') as FormGroup;
  }

  get responseArrayForm(): FormArray {
    return this.form.get('responses') as FormArray;
  }

  private _initializeForm(endpoint: EndpointEntity | undefined) {
    if (endpoint) {
      this.configurationForm.patchValue({
        delay: endpoint?.delay,
        emptyArray: endpoint?.emptyArray,
        forward: endpoint?.forward,
        activeStatusCode: endpoint?.activeStatusCode,
      });

      (this.configurationForm.get('headers') as FormArray).clear();

      endpoint?.headers?.forEach((header) =>
        (this.configurationForm.get('headers') as FormArray).push(
          this.fb.group({
            name: [header.name, [Validators.required]],
            value: [header.value, [Validators.required]],
          })
        )
      );

      this.responseArrayForm.clear();

      endpoint?.responses?.forEach((response) => {
        this.responseArrayForm.push(
          this.fb.group({
            id: response.id,
            statusCode: response.statusCode,
            body: response.body,
          })
        );
      });
    }
  }

  exportProject(project: ProjectsEntity) {
    const currentDate = new Date().toISOString();
    const fileName = `${project.name}-${currentDate}.json`;

    this.projectsFacade.exportProject(this.projectId, fileName);
  }

  importProject() {
    this.dialog.open(ImportProjectDialogComponent, {
      width: '400px',
      data: { projectId: this.projectId },
      position: POSITION,
    });
  }

  createCollection() {
    const dialogRef = this.dialog.open(CreateNewCollectionDialogComponent, {
      width: '400px',
      data: { name: '' },
      position: {
        top: '100px',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      this.collectionsFacade.createNewCollection(this.projectId, result);
    });
  }

  reloadProject() {
    this.collectionsFacade.refresh(this.projectId);
  }

  openProjectConfiguration() {
    const dialogRef = this.dialog.open(ProjectConfigurationDialogComponent, {
      width: '700px',
      data: {},
      position: {
        top: '100px',
      },
    });
  }

  renameCollection(collection: ICollection) {
    const dialogRef = this.dialog.open(RenameCollectionDialogComponent, {
      width: '400px',
      data: { name: collection.name },
      position: {
        top: '100px',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      this.collectionsFacade.updateCollection({ projectId: this.projectId, newName: result }, collection);
    });
  }

  deleteCollection(collection: ICollection) {
    const dialogRef = this.dialog.open(ConfirmDeleteCollectionDialogComponent, {
      width: '400px',
      data: { name: collection.name },
      position: {
        top: '100px',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      this.collectionsFacade.deleteCollection(collection);
    });
  }

  isBoolean(val: any): boolean {
    return typeof val === 'boolean';
  }
}
