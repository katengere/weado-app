import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeadoHomeComponent } from './components/weado-home/weado-home.component';

const routes: Routes = [
  {path:'', component: WeadoHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
