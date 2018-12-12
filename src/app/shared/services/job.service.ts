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
    today: Date =  new Date()

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
  getSingle(id: string, year: string): Observable<any> {
    return this.httpClient.get(`${this.jobsUrl}/proj_id/${id}?year=${year}`)
      .pipe(
        map(res => res),
      // .map(users => users.map(this.toUser))
       catchError(this.handleError)
    );
}
    /**
   * Updates single job.
   * Takes proj_id
   */
  updateJob(job: Job): Observable<any> {
    return this.httpClient.put(`${this.jobsUrl}/proj_id/${job.proj_id}`, job)
      .pipe(
        map(res => res),
      // .map(users => users.map(this.toUser))
       catchError(this.handleError)
    );
}
    /**
   * Updates single job.
   * Takes proj_id
   */
  deleteJob(job: Job): Observable<any> {
    return this.httpClient.delete(`${this.jobsUrl}/proj_id/${job.proj_id}`)
      .pipe(
        map(res => res),
      // .map(users => users.map(this.toUser))
       catchError(this.handleError)
    );
}

    /**
   * creates a new job.
   * 
   */
  createJob(job: Job): Observable<any> {
    return this.httpClient.post(`${this.jobsUrl}/`, job)
      .pipe(
        map(res => res),
      // .map(users => users.map(this.toUser))
       catchError(this.handleError)
    );
}
    /**
   * gets single project financial data.
   * Takes proj_id
   */
  getBudget(id: string, year: string): Observable<any> {
    return this.httpClient.get(`${this.jobsUrl}/proj_budget/${id}?year=${year}`)
      .pipe(
        map(res => res),
      // .map(users => users.map(this.toUser))
       catchError(this.handleError)
    );
}
getMonth(): any{
  
  let thisMonth = this.today.getMonth() + 1
  return thisMonth
}
getYears(): any[]{

  let thisYear = this.today.getFullYear()

  let firstYear = 2015
  const yearList: any[] = []
  for(let i = thisYear + 1; i >= firstYear; i--){
      
      yearList.push(i)
  }
  return yearList
  //console.log(this.yearList)
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
