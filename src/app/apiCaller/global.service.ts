import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { Storage } from '@ionic/storage';
import { appInitialize } from '@ionic/angular/dist/app-initialize';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';



const apiUrl = "http://192.168.0.141/TrustInsurance.Services/api/Client/";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  _Language;
  _UserInfo;
  constructor(private http: HttpClient,public _AlertController:AlertController,
    private _Storage: Storage,private _UniqueDeviceID:UniqueDeviceID) { }


  private _PostData(controllerName: string, data: any, 
    loggedInUserID: string = null, authorization: string = null): Observable<any> {



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

  //Set Value To Storage
  public setStorage(_key: string, _value: string):void {
    this._Storage.set(_key, _value);
  }

  //Get Value in Storage
  public getStorage(_key: string): Promise<any> {
    return new Promise(resolve => {
      this._Storage.get(_key).then((data) => {
        resolve(data);
      });
    })
  }

  //Delte Value from Storage
  public deleteStorage(_key: string):void {
    this._Storage.remove(_key);
  }

   //Method Device token
  public getDeviceToken() {
    var deviceToken = this._UniqueDeviceID.get()
      .then(uuid => uuid)
      .catch((error: any) => console.log(error));
    return deviceToken;
  }

   //Method Get Current Language
  CurrentLanguage() {
    this.getStorage('Lang').then(data => this._Language = data);
    return this._Language;
  }
   

   //Method Get User Account
  UserInfo() {
    this.getStorage('UserInfo').then(data => this._UserInfo = data);
    return this._UserInfo;
  }

   //Show Alert
   public async showAlert(_subHeader: string, _message: string, _buttons: [string]) {
    const alert = await this._AlertController.create({
      subHeader: _subHeader,
      message: _message,
      buttons: _buttons
    });
    await alert.present();
  }

  //



}

