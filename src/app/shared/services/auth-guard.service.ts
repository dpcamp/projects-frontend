import { Injectable } from '@angular/core';
import { map, switchMap, catchError, mergeMap, tap } from 'rxjs/operators';
import { Subject, Observable, of } from 'rxjs';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { User, AuthUser, UserAccess } from '../models';

@Injectable()

export class AuthGuardService implements CanActivate {
  authUser: AuthUser;
  userAccess: UserAccess;
  loggedIn = false;
  constructor(
    public auth: AuthService, 
    public router: Router,
    private authSvc: AuthService
    ) 
    {}
  canActivate(): Observable<boolean> {
    const subject = new Subject<boolean>();

    this.authSvc.login()
    .pipe(
      mergeMap(dataresults => of(dataresults)),
    switchMap(userInfo => this.authSvc.getUser(userInfo.user_name))
    )
      .subscribe(authUser => {
      this.authUser = authUser
      console.log(authUser)
      this.authSvc.auth(authUser.user_name)
      .subscribe(res => {
        if (this.authSvc.isLoggedIn() === true) {
          subject.next(true);
        }
        else {
          this.router.navigate(['/login'])
          subject.next(false);
        }
      })
      
    })
    console.log(this.authSvc.isLoggedIn())
    return subject.asObservable();
  }
}