import { Injectable } from '@angular/core';
import { map, switchMap, catchError, mergeMap, tap } from 'rxjs/operators';
import { Subject, Observable, of } from 'rxjs';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { User, AuthUser, UserAccess } from '../models';

@Injectable()

export class AuthGuardService implements CanActivate {
  authUser: User;
  userAccess: UserAccess;
  loggedIn = false;
  constructor(
    public auth: AuthService,
    public router: Router,
    private authSvc: AuthService
  ) { }
  canActivate(): boolean {
    if (localStorage.getItem('isLoggedIn') == 'true') { return true }
    else {

      this.authSvc.login()
        .pipe(
          mergeMap(dataresults => of(dataresults)),
          switchMap(userInfo => this.authSvc.getUser(userInfo.user_name))
        )
        .subscribe(authUser => {
          this.authUser = authUser
          this.authSvc.auth(authUser.user_name)
            .subscribe(res => {
              if (this.authSvc.isLoggedIn() === true) {
                window.location.reload() //hack to refresh page when user logs in for the first time
                return true;

              }
              else {
                this.router.navigate(['/login'])
                return false;
              }
            })

        })
    }

  }
}