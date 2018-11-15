import { Injectable } from '@angular/core';
import {throwError as observableThrowError} from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, catchError, mergeMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

//import { LoggedUser } from '../models/logged-user'

@Injectable()
export class AuthService {

  private authUserSource = new Subject<string>();
  authUser$ = this.authUserSource.asObservable();

  constructor(
    private http: HttpClient
  ) {
    // look at localStorage to check if the user is logged in
    // this.loggedIn = !!localStorage.getItem('auth_token');
  }

  /**
   * Check if the user is logged in
  isLoggedIn() {
    return this.loggedIn;
  }

  /**
   * Log the user in
   */
  login(): Observable<any> {
    return this.http.get(`${environment.authUrl}auth/getuser`)
        .pipe(
        map(res => res),
      // .map(users => users.map(this.toUser))
       catchError(this.handleError)
    )
 //         this.loggedIn = true;

  }

  getUser(un: string): Observable<any> {
    // attaching a token
    // let headers = new Headers();
    // let token   = localStorage.getItem('auth_token');
    // headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', `Bearer ${token}`);
    this.authUserSource.next(un)
    return this.http.get(`${environment.usersUrl}/${un}`)
      .pipe(
        map(res => res),
        catchError(this.handleError)
      )
  }

  /**
   * Log the user out
   */
  logout() {
  }

  /**
   * Handle any errors from the API
   */
  private handleError(err) {
    let errMessage: string;

    if (err instanceof Response) {
      const body   = err.json() || '';
      const error  = body.error || JSON.stringify(body);
      errMessage = `${err.status} - ${err.statusText || ''} ${error}`;
    } else {
      errMessage = err.message ? err.message : err.toString();
    }

    return observableThrowError(errMessage);
  }

}
