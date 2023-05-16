import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ManageComponent } from './components/manage/manage.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { RegisterComponent } from './components/register/register.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { ProjectEditComponent } from './components/project-edit/project-edit.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {
      path:'manage', component: ManageComponent,
      children:[
        {path:'', component:ProjectListComponent},
        {path:'details/:_id', component:ProjectDetailsComponent},
        {path:'edit/:id', component:ProjectEditComponent},
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
