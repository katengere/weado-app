import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ProjectSummaryComponent } from './components/project-summary/project-summary.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { WeadoHomeComponent } from './components/weado-home/weado-home.component';
import { canActivateProject } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'weado/home', pathMatch: 'full' },
  { path: 'weado/home', component: WeadoHomeComponent },
  { path: 'weado/about', component: AboutComponent },
  {
    path: 'weado/projects', component: ProjectsComponent,
    children: [
      { path: '', component: ProjectSummaryComponent },
      { path: ':year', component: ProjectSummaryComponent, canActivate: [canActivateProject] }
    ]
  },
  { path: 'weado/contacts', component: ContactsComponent },
  { path: 'weado/admin', loadChildren: () => import('./admin/admin.module').then(module => module.AdminModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
