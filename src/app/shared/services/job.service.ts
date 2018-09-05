import {throwError as observableThrowError} from 'rxjs';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap, catchError, mergeMap, tap } from 'rxjs/operators';
import { Job } from '../models/';
import { environment } from '../../../environments/environment';

@Injectable()
export class JobService {
    private jobsUrl: string = environment.jobsUrl;

    constructor(
        private http: Http,
        protected httpClient: HttpClient
      ) {}
    /**
   * Get all jobs
   */
  getJobs(): Observable<any> {
    return this.httpClient.get(this.jobsUrl)
      .pipe(
        map(res => res),
      // .map(users => users.map(this.toUser))
       catchError(this.handleError)
    );
  }
    /**
   * Get single job.
   * Takes job_num
   */
  getSingle(id: string): Observable<any> {
    return this.httpClient.get(`${this.jobsUrl}/${id}`)
      .pipe(
        map(res => res),
      // .map(users => users.map(this.toUser))
       catchError(this.handleError)
    );
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