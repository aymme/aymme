import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CollectionsEntity, CollectionsFacade } from '@aymme/client/collection/data-access';
import { ProjectsEntity, ProjectsFacade } from '@aymme/client/projects/data-access';
import { EndpointFacade } from '@aymme/client/mock/data-access';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  ConfirmDeleteCollectionDialogComponent,
  CreateNewCollectionDialogComponent,
  ImportProjectDialogComponent,
  ProjectConfigurationDialogComponent,
  RenameCollectionDialogComponent,
} from '@aymme/client/mock/feature/dialogs';
import { ICollection } from '@aymme/shared/model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

const POSITION = { top: '100px' };

interface CompressedCollectionsEntity extends CollectionsEntity {
  compressed: boolean;
}

@Component({
  selector: 'aymme-endpoint-list',
  templateUrl: './endpoint-list.component.html',
  styles: [],
})
export class EndpointListComponent implements OnInit {
  projectId: string = this.route.snapshot.parent?.parent?.parent?.parent?.params['projectId'];

  selectedProject$: Observable<ProjectsEntity | undefined> = this.projectsFacade.selectedProject$;
  loaded$: Observable<boolean> = this.collectionsFacade.loaded$;
  collections$: Observable<CollectionsEntity[]> = this.collectionsFacade.allCollections$;
  selectedEndpoint$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private collectionsFacade: CollectionsFacade,
    private projectsFacade: ProjectsFacade,
    private endpointFacade: EndpointFacade,
    public dialog: MatDialog
  ) {
    // this.collectionsFacade.init(this.projectId);
  }

  ngOnInit(): void {
    console.log(this.route);
    console.log(this.route.snapshot.parent?.parent?.parent?.parent?.params['projectId']);
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

    this.router.navigate([{ outlets: { details: [id] } }], { relativeTo: this.route });

    // this.selectedEndpoint$.next(id);
    // this.endpointFacade.loadEndpoint(id);
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
}
