import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeadoHomeComponent } from './components/weado-home/weado-home.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';

const routes: Routes = [
  {path:'', component: WeadoHomeComponent},
  {path:'about', component:AboutComponent},
  {
    path:'projects', component:ProjectsComponent,
    children:[
      {path:'', component:ProjectDetailsComponent},
      {path:':year', component:ProjectDetailsComponent}
    ]
  },
  {path:'contacts', component:ContactsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
