import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_SNACK_BAR_DATA, MatSnackBarModule } from "@angular/material/snack-bar";

import { AppComponent } from './app.component';
import { WeadoHomeComponent } from './components/weado-home/weado-home.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { MessageComponent } from './components/message/message.component';
import { ProjectSummaryComponent } from './components/project-summary/project-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    WeadoHomeComponent,
    AboutComponent,
    ProjectsComponent,
    ContactsComponent,
    MessageComponent,
    ProjectSummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NoopAnimationsModule,
    MatSnackBarModule,
  ],
  providers: [{provide: MAT_SNACK_BAR_DATA, useValue:MAT_SNACK_BAR_DATA}],
  bootstrap: [AppComponent]
})
export class AppModule { }
