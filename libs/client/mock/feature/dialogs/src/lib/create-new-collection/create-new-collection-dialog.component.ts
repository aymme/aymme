import { Component, HostListener, Inject } from '@angular/core';
import {
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
  MatLegacyDialogRef as MatDialogRef,
} from '@angular/material/legacy-dialog';

interface DialogData {
  name: string;
}

@Component({
  selector: 'ay-create-new-collection-dialog',
  templateUrl: 'create-new-collection-dialog.component.html',
})
export class CreateNewCollectionDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CreateNewCollectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  @HostListener('window:keyup.enter', ['$event'])
  onDialogClick(): void {
    this.dialogRef.close(this.data.name);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
