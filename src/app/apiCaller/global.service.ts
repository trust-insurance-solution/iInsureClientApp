import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { appInitialize } from '@ionic/angular/dist/app-initialize';

const apiUrl = "https://api.trst-ins.com/api/Client/";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http: HttpClient) { }


  PostData(controllerName: string, data: any, loggedInUserID : string = null, authorization: string = null): Observable<any> {
   
     

    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'LoggedInUserID': loggedInUserID != null ? loggedInUserID : '',
      'Authorization': authorization != null ? authorization : ''
    });


    let response1 = this.http.post(apiUrl + controllerName, data, { headers });
    return forkJoin([response1]);
  }
}

