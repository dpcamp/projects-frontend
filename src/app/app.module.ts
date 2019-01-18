import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { ClarityModule} from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as svc from '../app/shared/services';
import * as cpt from '../app';
import * as pipe from '../app/shared/pipes';
import { Routing } from './app.routing';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WinAuthInterceptor } from './shared/interceptors/winauth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    pipe.JobFilterPipe,
    pipe.ReqFilterPipe,
    pipe.InvFilterPipe,
    cpt.JobsComponent,
    cpt.JobListComponent,
    cpt.JobSingleComponent,
    cpt.LoginComponent,
    cpt.HeaderComponent,
    cpt.InvoiceListComponent,
    cpt.RequisitionListComponent,
    cpt.NewsComponent,
    cpt.NewsSidebarComponent,
    cpt.NewsReleaseComponent,
    cpt.NewsBacklogComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    ClarityModule,
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
    svc.AuthGuardService,
    svc.RequisitionService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
