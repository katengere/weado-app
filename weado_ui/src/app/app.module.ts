import { HttpClientModule } from "@angular/common/http";
import { isDevMode, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_SNACK_BAR_DATA, MatSnackBarModule } from "@angular/material/snack-bar";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';


import { EntityDataModule, HttpUrlGenerator } from "@ngrx/data";
import { EffectsModule } from "@ngrx/effects";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { MessageComponent } from './components/message/message.component';
import { ProjectSummaryComponent } from './components/project-summary/project-summary.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { WeadoHomeComponent } from './components/weado-home/weado-home.component';
import { entityConfig } from "./entity-metadata";
import { CustomHttpGeneratorService } from "./services/customHTTP/custom-http-generator.service";

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
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EntityDataModule.forRoot(entityConfig),
  ],
  providers: [
    { provide: HttpUrlGenerator, useClass: CustomHttpGeneratorService },
    { provide: MAT_SNACK_BAR_DATA, useValue: MAT_SNACK_BAR_DATA }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
