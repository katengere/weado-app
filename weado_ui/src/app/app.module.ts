import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_SNACK_BAR_DATA, MatSnackBarModule } from "@angular/material/snack-bar";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { MessageComponent } from './components/message/message.component';
import { ProjectSummaryComponent } from './components/project-summary/project-summary.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { WeadoHomeComponent } from './components/weado-home/weado-home.component';

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
    BrowserAnimationsModule,
    MatSnackBarModule,
  ],
  providers: [{ provide: MAT_SNACK_BAR_DATA, useValue: MAT_SNACK_BAR_DATA }],
  bootstrap: [AppComponent]
})
export class AppModule { }
