import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import {
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
  MatLegacyDialogRef as MatDialogRef,
} from '@angular/material/legacy-dialog';
import { ProjectsFacade } from '@aymme/client/projects/data-access';
import { BehaviorSubject } from 'rxjs';

interface DialogData {
  projectId: string;
}

@Component({
  selector: 'ay-import-project-dialog',
  templateUrl: 'import-project-dialog.component.html',
})
export class ImportProjectDialogComponent {
  importProjectForm: UntypedFormGroup = this.fb.group({
    importFiles: null,
  });

  file$: BehaviorSubject<File | null> = new BehaviorSubject<File | null>(null);

  constructor(
    public dialogRef: MatDialogRef<ImportProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    private projectsFacade: ProjectsFacade
  ) {}

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input && input.files) {
      const file: File = input.files[0];
      this.file$.next(file);

      this.importProjectForm.reset();
    }
  }

  doImport() {
    const file: File = this.file$.getValue() as File;

    if (file && file.type === 'application/json') {
      this.projectsFacade.importProject(this.data.projectId, file);
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
