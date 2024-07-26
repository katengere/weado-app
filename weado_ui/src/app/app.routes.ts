import { Routes } from '@angular/router';
import { ProjectDetailsComponent } from './admin/components/project-details/project-details.component';
import { ProjectEditComponent } from './admin/components/project-edit/project-edit.component';
import { ProjectListComponent } from './admin/components/project-list/project-list.component';
import { AboutComponent } from './components/about/about.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ProjectSummaryComponent } from './components/project-summary/project-summary.component';
import { canActivateProject } from './guards/auth.guard';


export const routes: Routes = [
  { path: '', redirectTo: 'weado/home', pathMatch: 'full' },
  {
    path: 'weado/home',
    loadComponent: () => import('./components/weado-home/weado-home.component').then(m => m.WeadoHomeComponent)
  },
  {
    path: 'weado/about',
    component: AboutComponent
  },
  {
    path: 'weado/projects',
    loadComponent: () => import('./components/projects/projects.component').then(m => m.ProjectsComponent),
    children: [
      {
        path: '',
        component: ProjectSummaryComponent
      },
      {
        path: ':year',
        component: ProjectSummaryComponent,
        canActivate: [canActivateProject]
      }
    ]
  },
  {
    path: 'weado/contacts',
    component: ContactsComponent
  },
  {
    path: 'weado/admin/login',
    loadComponent: () => import('./admin/components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'weado/admin/register',
    loadComponent: () => import('./admin/components/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'weado/admin/manage',
    loadComponent: () => import('./admin/components/manage/manage.component').then(m => m.ManageComponent),
    children: [
      {
        path: '',
        component: ProjectListComponent
      },
      {
        path: 'details/:_id',
        component: ProjectDetailsComponent
      },
      {
        path: 'edit/:id',
        component: ProjectEditComponent
      },
    ]
  }
];
