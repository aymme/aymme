import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface DeleteCollectionDialogData {
  name: string;
}

@Component({
  selector: 'ay-confirm-delete-collection-dialog',
  templateUrl: 'confirm-delete-collection-dialog.html',
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
