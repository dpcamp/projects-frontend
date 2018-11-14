import { Component, OnInit } from '@angular/core';
import { map, switchMap, catchError, mergeMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User, AuthUser } from './shared/models/';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userInfo: User;
  authUser: AuthUser;
isAdmin = false;

constructor(
  private authSvc: AuthService
  ){ }
  
  ngOnInit(){

    this.UserAuth()
  
  }
  UserAuth() {
    this.authSvc.login()
    /*.subscribe(
      loggedUser => this.loggedUser = loggedUser
    )*/
    
    .pipe(
      tap(res => {
        console.log(res)
        if (res.is_admin === true) {
          this.isAdmin = true;
          console.log(this.isAdmin)
        }
      }),
      mergeMap(dataresults => of(dataresults)),
    switchMap(userInfo => this.authSvc.getUser(userInfo.user_name))
    )
      .subscribe(authUser => {
      this.authUser = authUser
        if (authUser.is_admin) {
          this.isAdmin = false;
        } else {
          this.isAdmin = false;
        }
  
    })
  }
}


