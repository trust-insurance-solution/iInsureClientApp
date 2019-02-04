import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  apiUrl:string='http://192.168.0.141/TrustInsurance.Services/api/';

  constructor(private _HttpClient: HttpClient) {
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  //Common Code to get data using api
  getService(controllerName): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const url = `${this.apiUrl}/${controllerName}`;
    return this._HttpClient.get(this.apiUrl, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  //Common Code to get data by id using api
  getServiceById(controllerName, id): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const url = `${this.apiUrl}/${controllerName}/${id}`;
    return this._HttpClient.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  //Common Code to post data using api
  postService(controllerName, data): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const url = `${this.apiUrl}/${controllerName}`;
    return this._HttpClient.post('http://192.168.0.141/TrustInsurance.Services/api/Client/CreateNewClientAccount', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  saveUser(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return new Promise((resolve, reject) => {
    this._HttpClient.post('http://192.168.0.141/TrustInsurance.Services/api/Client/CreateNewClientAccount', JSON.stringify(data),httpOptions).subscribe(res => {
    resolve(res);
    }, (err) => {
    reject(err);
    });
    });
    }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
