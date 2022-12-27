import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateNewCollectionDialogComponent } from './create-new-collection/create-new-collection-dialog.component';
import { ConfirmDeleteCollectionDialogComponent } from './confirm-delete-collection/confirm-delete-collection-dialog.component';
import { RenameCollectionDialogComponent } from './rename-collection/rename-collection-dialog.component';
import { ImportProjectDialogComponent } from './import-project/import-project-dialog.component';
import { ProjectConfigurationDialogComponent } from './project-configuration/project-configuration-dialog.component';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoaderModule } from '@aymme/client/shell/ui/loader';
import { EditorModule } from '@aymme/client/shared/ui/editor';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
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
