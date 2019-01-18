import { Injectable } from '@angular/core';
import {throwError as observableThrowError} from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, catchError, mergeMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { UserAccess, User } from '../models/index'

//import { LoggedUser } from '../models/logged-user'

@Injectable()
export class AuthService {
  private authUserSource = new Subject<string>();
  authUser$ = this.authUserSource.asObservable();
  loggedIn: boolean
  constructor(
    private http: HttpClient
  ) {
    // look at localStorage to check if the user is logged in
    // this.loggedIn = !!localStorage.getItem('auth_token');
  }
  
  /**
   * Check if the user is logged in
  */
  isLoggedIn():boolean {
    if (this.loggedIn === true){
      localStorage.setItem('isLoggedIn', 'true');
    return this.loggedIn;
    } else {
      localStorage.setItem('isLoggedIn', 'false');
      return this.loggedIn;
    }
      
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
    /**
   * Log the user in
   */
  auth(un: string): Observable<UserAccess> {
    return this.http.get<UserAccess>(`${environment.usersUrl}/${un}`)
        .pipe(
        map(res => res),
        tap(res => this.loggedIn = res.authenticated)
        ,
      // .map(users => users.map(this.toUser))
       catchError(this.handleError)
    )
          

  }
    /**
   * Get User Data
   * Logs firstName and lastName to localStorage
   */
  getUser(un: string): Observable<any> {
    this.authUserSource.next(un)
    localStorage.setItem('username', un)
    return this.http.get<User>(`${environment.ADUrl}/${un}`)
      .pipe(
        map(res => res),
        tap(res => {
          localStorage.setItem('firstName', res.first_name)
          localStorage.setItem('lastName', res.last_name)
        }),
        catchError(this.handleError)
      )
  }
    /**
   * gets all jobs associated with a user
   */
  getUserJobs(un: string): Observable<any> {
    this.authUserSource.next(un)
    localStorage.setItem('username', un)
    return this.http.get<any>(`${environment.usersUrl}/${un}`)
      .pipe(
        map(res => res),
        catchError(this.handleError)
      )
  }
  returnUser(): String {
    return localStorage.getItem('username');
      
  }
    /**
   * Get all users
   */
  getUsers(): Observable<any> {
    return this.http.get<any>(environment.usersUrl)
      .pipe(
        map(res => res),
        catchError(this.handleError)
    );
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
