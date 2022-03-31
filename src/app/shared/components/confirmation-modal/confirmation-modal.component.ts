import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationModalData } from 'src/app/interfaces/interfaces';
@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public popUpData: ConfirmationModalData,
    private dialogRef: MatDialogRef<ConfirmationModalComponent>
  ) {}

  ngOnInit(): void {}

  confirm() {
    this.dialogRef.close(true);
  }

  close() {
    this.dialogRef.close();
  }
}
