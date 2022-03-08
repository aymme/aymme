import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectsFacade } from '@aymme/client/projects/data-access';
import { BehaviorSubject } from 'rxjs';

interface DialogData {
  projectId: string;
}

@Component({
  selector: 'ay-import-project-dialog',
  templateUrl: 'import-project-dialog.html',
})
export class ImportProjectDialogComponent {
  importProjectForm: FormGroup = this.fb.group({
    importFiles: null,
  });

  file$: BehaviorSubject<File | null> = new BehaviorSubject<File | null>(null);

  constructor(
    public dialogRef: MatDialogRef<ImportProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
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
