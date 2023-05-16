import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeadoHomeComponent } from './components/weado-home/weado-home.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ProjectSummaryComponent } from './components/project-summary/project-summary.component';

const routes: Routes = [
  {path:'', component: WeadoHomeComponent},
  {path:'about', component:AboutComponent},
  {
    path:'projects', component:ProjectsComponent,
    children:[
      {path:'', component:ProjectSummaryComponent},
      {path:':year', component:ProjectSummaryComponent}
    ]
  },
  {path:'contacts', component:ContactsComponent},
  {path:'admin', loadChildren: ()=>import('./admin/admin.module').then(module=>module.AdminModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
