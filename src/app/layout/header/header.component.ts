import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { ConfirmationModalData } from 'src/app/interfaces/interfaces';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  get isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

  constructor(
    private router: Router,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationModalData,
    private dialogRef: MatDialogRef<HeaderComponent>
  ) {}

  ngOnInit(): void {}

  logOut() {
    this.matDialog
      .open(ConfirmationModalComponent, {
        data: { message: 'Are you sure you want to logout ?' },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          localStorage.clear();
          this.router.navigate(['login']);
        }
      });
  }
}
