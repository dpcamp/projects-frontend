import {throwError as observableThrowError} from 'rxjs';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap, catchError, mergeMap, tap } from 'rxjs/operators';
import { Job, Invoice } from '../models';
import { environment } from '../../../environments/environment';

@Injectable()
export class InvoiceService {
    private invsUrl: string = environment.invsUrl;

    constructor(
        private http: Http,
        protected httpClient: HttpClient
      ) {}
    /**
   * Get all invoices
   */
  getInvs(): Observable<any> {
    return this.httpClient.get(this.invsUrl)
      .pipe(
        map(res => res),
       catchError(this.handleError)
    );
  }
    /**
   * Get single invoice.
   * Takes inv_num
   */
  getSingle(id: string): Observable<any> {
    return this.httpClient.get(`${this.invsUrl}/${id}`)
      .pipe(
        map(res => res),
      // .map(users => users.map(this.toUser))
       catchError(this.handleError)
    );
}

    /**
   * Post a new invoice.
   * 
   */
  newInv(invs: Invoice): Observable<any> {
    return this.httpClient.post(this.invsUrl, invs)
      .pipe(
        map(res => res),
      // .map(users => users.map(this.toUser))
       catchError(this.handleError)
    );
}
  updateInv(inv: Invoice): Observable<any> {
    return this.httpClient.put(`${this.invsUrl}/${inv.id}`, inv)
    .pipe(
      map(res => res),
      catchError(this.handleError)
    )
  }
    /**
   * Get single invoice.
   * Takes id
   */
  deleteInv(id: string): Observable<any> {
    return this.httpClient.delete(`${this.invsUrl}/${id}`)
      .pipe(
        map(res => res),
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
