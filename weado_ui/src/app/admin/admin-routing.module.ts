import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ManageComponent } from './components/manage/manage.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'manage', component: ManageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
