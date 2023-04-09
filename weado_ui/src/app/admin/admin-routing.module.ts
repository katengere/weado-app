import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ManageComponent } from './components/manage/manage.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';

const routes: Routes = [
  {
    path:'', component: AdminHomeComponent,
    children:[
    {path:'login', component:LoginComponent},
    {
      path:'manage', component: ManageComponent,
      children:[
        {path:'', component:ProjectListComponent},
        {path:'add', component:AddProjectComponent},
      ]
    }
  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
