import {throwError as observableThrowError} from 'rxjs';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap, catchError, mergeMap, tap } from 'rxjs/operators';
import { Job, Invoice, Requisition } from '../models';
import { environment } from '../../../environments/environment';

@Injectable()
export class RequisitionService {
    private reqsUrl: string = environment.reqsUrl;

    constructor(
        private http: Http,
        protected httpClient: HttpClient
      ) {}

    /**
   * Update the budget year on a requisition.
   * 
   */

  updateReq(reqs: Requisition): Observable<Requisition> {
    return this.httpClient.put<Requisition>(`${this.reqsUrl}/req_num/${reqs.req_num}`,
    {
      "budget_year": reqs.budget_year
    })
    .pipe(
      map(res => res),
      catchError(this.handleError)
    )
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
