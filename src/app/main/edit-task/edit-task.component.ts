import { Component, Inject, OnInit, Optional } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TaskService } from '../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/interfaces/interfaces';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {
  taskId: string = '';
  taskDetails: any;
  editTask: FormGroup = new FormGroup({
    task: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(100),
    ]),
    completed: new FormControl(false),
  });
  constructor(
    private matDialog: MatDialog,
    private taskService: TaskService,
    @Optional() private dialogRef: MatDialogRef<EditTaskComponent>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    @Optional() @Inject(MAT_DIALOG_DATA) public popUpData: Task
  ) {}
  dataLoaded: boolean = false;

  ngOnInit(): void {
    if (this.popUpData) {
      this.dataLoaded = true;
      this.taskId = this.popUpData._id;
      this.editTask.setValue({
        task: this.popUpData.task,
        completed: this.popUpData.completed,
      });
    }
    // else {
    //   // Router link option
    //   this.activatedRoute.params.subscribe((data) => {
    //     this.taskId = data['_id'];
    //     console.log(this.taskId);

    //     if (this.taskId !== '') {
    //       this.taskService.getTask(this.taskId).subscribe((data: Task) => {
    //         console.log('data', data);

    //         this.dataLoaded = true;
    //         this.editTask.setValue({
    //           task: data.task,
    //           completed: data.completed,
    //         });
    //       });
    //     }
    //   });
    // }
  }
  updateTask() {
    if (this.editTask.valid) {
      this.matDialog
        .open(ConfirmationModalComponent, {
          data: { message: 'Are you sure you want to save these changes?' },
        })
        .afterClosed()
        .subscribe((result) => {
          if (result) {
            this.taskService
              .editTask(this.taskId, this.editTask.value)
              .subscribe((data) => {
                this.close(true);
                console.log('From edit', data);
              });
          }
        });
    }
  }

  close(refresh: boolean = false) {
    if (this.popUpData) {
      this.dialogRef.close(refresh);
    } else {
      this.router.navigate(['']);
    }
  }
}
