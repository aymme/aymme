import { Component, HostListener, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DialogData {
  name: string;
}

@Component({
  selector: 'ay-rename-collection-dialog',
  templateUrl: 'rename-collection-dialog.html',
})
export class RenameCollectionDialogComponent {
  currentName: string = this.data.name;

  constructor(
    public dialogRef: MatDialogRef<RenameCollectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  @HostListener('window:keyup.enter', ['$event'])
  onDialogClick(event: KeyboardEvent): void {
    this.onEnterPress();
  }

  onEnterPress(): void {
    this.dialogRef.close(this.data.name);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
