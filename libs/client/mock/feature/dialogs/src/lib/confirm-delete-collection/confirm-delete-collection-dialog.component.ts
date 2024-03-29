import { Component, Inject } from '@angular/core';
import {
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
  MatLegacyDialogRef as MatDialogRef,
} from '@angular/material/legacy-dialog';

interface DeleteCollectionDialogData {
  name: string;
}

@Component({
  selector: 'ay-confirm-delete-collection-dialog',
  templateUrl: 'confirm-delete-collection-dialog.component.html',
})
export class ConfirmDeleteCollectionDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteCollectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteCollectionDialogData
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
