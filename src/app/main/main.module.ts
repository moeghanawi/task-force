import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TaskService } from './services/task.service';
import { MainInterceptor } from './interceptors/main.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [MainComponent, EditTaskComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatCardModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    MatDialogModule,
    RouterModule,
    MatCheckboxModule,
    MatToolbarModule,
  ],
  providers: [
    TaskService,
    { provide: HTTP_INTERCEPTORS, useClass: MainInterceptor, multi: true },
  ],
  entryComponents: [EditTaskComponent],
  exports: [EditTaskComponent],
})
export class MainModule {}
