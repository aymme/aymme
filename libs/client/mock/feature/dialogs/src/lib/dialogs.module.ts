import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateNewCollectionDialogComponent } from './create-new-collection/create-new-collection-dialog.component';
import { ConfirmDeleteCollectionDialogComponent } from './confirm-delete-collection/confirm-delete-collection-dialog.component';
import { RenameCollectionDialogComponent } from './rename-collection/rename-collection-dialog.component';
import { ImportProjectDialogComponent } from './import-project/import-project-dialog.component';
import { ProjectConfigurationDialogComponent } from './project-configuration/project-configuration-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoaderModule } from '@aymme/client/shell/ui/loader';
import { EditorModule } from '@aymme/client/shared/ui/editor';
import { MatInputModule } from '@angular/material/input';
import { ButtonModule } from '@aymme/client/shared/ui/button';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    LoaderModule,
    EditorModule,
    FormsModule,
    MatInputModule,
    ButtonModule,
  ],
  declarations: [
    CreateNewCollectionDialogComponent,
    ConfirmDeleteCollectionDialogComponent,
    RenameCollectionDialogComponent,
    ProjectConfigurationDialogComponent,
    ImportProjectDialogComponent,
  ],
  exports: [
    CreateNewCollectionDialogComponent,
    ConfirmDeleteCollectionDialogComponent,
    RenameCollectionDialogComponent,
    ProjectConfigurationDialogComponent,
    ImportProjectDialogComponent,
  ],
})
export class DialogsModule {}
