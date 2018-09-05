import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as svc from '../app/shared/services';
import * as cpt from '../app';
import { Routing } from './app.routing';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    cpt.JobsComponent,
    cpt.JobListComponent,
    cpt.JobSingleComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    ClarityModule,
    BrowserAnimationsModule,
    Routing,
    HttpModule,
    HttpClientModule
  ],
  providers: [
    svc.JobService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
