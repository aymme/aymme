import { Component, HostListener, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { CollectionsEntity, CollectionsFacade } from '@aymme/client/collection/data-access';
import { ProjectsEntity, ProjectsFacade } from '@aymme/client/projects/data-access';
import { EndpointFacade } from '@aymme/client/mock/data-access';
import { EndpointEntity, ResponseEntity } from '@aymme/client/mock/model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ICollection } from '@aymme/shared/model';

interface CompressCollectionsEntity extends CollectionsEntity {
  compressed: boolean;
}

interface DialogData {
  name: string;
}

interface DeleteCollectionDialogData {
  name: string;
}

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

  isEndpointSelected() {
    return true;
  }

  updateEndpoint() {
    this.endpointFacade.updateEndpoint({
      ...this.configurationForm.value,
      delay: Number(this.configurationForm.value['delay']),
      responses: [...this.responseArrayForm.value],
    });
  }

  toggleCompress(collection: CompressCollectionsEntity) {
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

      this.collectionsFacade.moveEndpointInCollection({ containerId: container.id, previousIndex, currentIndex });
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

  createCollection() {
    const dialogRef = this.dialog.open(NewCollectionDialogComponent, {
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

  renameCollection(collection: ICollection) {
    console.log('TODO: implement rename collection.');
  }

  deleteCollection(collection: ICollection) {
    const dialogRef = this.dialog.open(ConfirmDeleteCollectionComponent, {
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

// TODO: can extract this component to their own file.
@Component({
  selector: 'ay-dialog-overview-example-dialog',
  templateUrl: 'new-collection-dialog.html',
})
export class NewCollectionDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<NewCollectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  @HostListener('window:keyup.enter', ['$event'])
  onDialogClick(event: KeyboardEvent): void {
    this.onCancelClick();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}

// TODO: can extract this component to their own file.
@Component({
  selector: 'ay-confirm-delete-collection-dialog',
  templateUrl: 'confirm-delete-collection-dialog.html',
})
export class ConfirmDeleteCollectionComponent {
  constructor(
    public dialogRef: MatDialogRef<NewCollectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteCollectionDialogData
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
