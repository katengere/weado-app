import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ManageComponent } from './components/manage/manage.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { ProjectEditComponent } from './components/project-edit/project-edit.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'manage', component: ManageComponent,
    children: [
      { path: '', component: ProjectListComponent },
      { path: 'details/:_id', component: ProjectDetailsComponent },
      { path: 'edit/:id', component: ProjectEditComponent },
    ]
  },
  { path: '**', redirectTo: 'manage', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
