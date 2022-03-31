import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task } from '../interfaces/interfaces';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { TaskService } from './services/task.service';

import { ConfirmationModalComponent } from '../shared/components/confirmation-modal/confirmation-modal.component';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  date: Date = new Date();
  tasks: Task[] = [];
  newTaskForm: FormGroup = new FormGroup({});
  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getTasks();

    this.newTaskForm = this.formBuilder.group({
      task: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100),
      ]),
      completed: new FormControl(false),
    });
  }

  getTasks() {
    this.taskService.getAllTasks().subscribe((data) => {
      this.tasks = data;
    });
  }

  createTask() {
    this.taskService.createTask(this.newTaskForm.value).subscribe((data) => {
      this.getTasks();
      this.newTaskForm.reset();
    });
  }

  deleteTask(id: string) {
    this.matDialog
      .open(ConfirmationModalComponent, {
        data: {
          message: 'Are you sure you want to delete this task?',
          buttonName: 'Delete Task',
          buttonColor: 'warn',
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.taskService.deleteTask(id).subscribe((data) => {
            this.snackBar.open(data.msg, undefined, { duration: 5000 });
            this.getTasks();
          });
        }
      });
  }

  openDialog(task: Task) {
    this.matDialog
      .open(EditTaskComponent, { data: task })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.getTasks();
        }
      });
  }
}
