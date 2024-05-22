import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from "@angular/material/input";
import { AdminRoutingModule } from './admin-routing.module';

import { SafePipe } from '../pipes/safe.pipe';
import { AddActivitiesComponent } from './components/add-activities/add-activities.component';
import { AddImagesComponent } from './components/add-images/add-images.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { AddReportComponent } from './components/add-report/add-report.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { LoginComponent } from './components/login/login.component';
import { ManageComponent } from './components/manage/manage.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { ProjectEditComponent } from './components/project-edit/project-edit.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ManageComponent,
    AddProjectComponent,
    ProjectListComponent,
    ProjectDetailsComponent,
    AdminHomeComponent,
    ProjectEditComponent,
    ConfirmDialogComponent,
    AddReportComponent,
    AddActivitiesComponent,
    AddImagesComponent,
    SafePipe
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class AdminModule { }
