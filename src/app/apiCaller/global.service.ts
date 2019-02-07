import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { appInitialize } from '@ionic/angular/dist/app-initialize';

const apiUrl = "http://192.168.0.141/TrustInsurance.Services/api/Client/";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http: HttpClient,public _AlertController:AlertController) { }


  private _PostData(controllerName: string, data: any, loggedInUserID: string = null, authorization: string = null): Observable<any> {



    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'LoggedInUserID': loggedInUserID != null ? loggedInUserID : '',
      'Authorization': authorization != null ? authorization : ''
    });


    let response1 = this.http.post(apiUrl + controllerName, data, { headers });
    return forkJoin([response1]);
  }

  public PostData(controllerName: string, userData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._PostData(controllerName, userData)
        .subscribe(res => {
          resolve(res);
        },
          err => {
            console.log(err);
          });
    });
  }

   //Method Device token



   //Method Get Current Language

   

   //Method Get User Account


   //Show Alert
   public async showAlert(_subHeader: string, _message: string, _buttons: [string]) {
    const alert = await this._AlertController.create({
      subHeader: _subHeader,
      message: _message,
      buttons: _buttons
    });
    await alert.present();
  }

}

