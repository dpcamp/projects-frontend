import { Component, OnInit } from '@angular/core';
import { map, switchMap, catchError, mergeMap, tap } from 'rxjs/operators';
import { Subscription, Observable, of } from 'rxjs';
import { User, AuthUser, UserAccess } from './shared/models';
import { AuthService } from './shared/services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {
  userInfo: User;
  authUser: UserAccess;
  userAccess: UserAccess;
  isAdmin = false;
  subscription: Subscription;
  logUser: string;
  isLoggedIn: boolean;


  constructor(
    private authSvc: AuthService
  ) { }

  ngOnInit() {

    this.isLoggedIn = (localStorage.getItem('isLoggedIn') == "true")
    this.UserAuth()


  }
  UserAuth() {
    this.authSvc.login()
      /*.subscribe(
        loggedUser => this.loggedUser = loggedUser
      )*/
      .pipe(
        tap(res => {

          if (res.is_admin === true) {
            this.isAdmin = true;

          }
        }),
        mergeMap(dataresults => of(dataresults)),
        switchMap(userInfo => this.authSvc.getUser(userInfo.user_name))
      )
      .subscribe(authUser => {
        this.logUser = authUser.user_name

        this.authenticate(authUser.user_name)

      })
  }
  authenticate(un) {
    this.authSvc.auth(un)
      .subscribe(res => {
        this.authUser = res;
      }
      )
  }

}