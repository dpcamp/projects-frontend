import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { ClarityModule, ClrFormsNextModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as svc from '../app/shared/services';
import * as cpt from '../app';
import { Routing } from './app.routing';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WinAuthInterceptor } from './shared/interceptors/winauth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    cpt.JobsComponent,
    cpt.JobListComponent,
    cpt.JobSingleComponent,
    cpt.LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    ClarityModule,
    ClrFormsNextModule,
    BrowserAnimationsModule,
    Routing,
    FormsModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WinAuthInterceptor,
      multi: true
    },
    svc.JobService,
    svc.InvoiceService,
    svc.AuthService,
    svc.AuthGuardService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
