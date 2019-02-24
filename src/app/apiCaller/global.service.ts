import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Platform } from '@ionic/angular';
import { Network } from '@ionic-native/network';
import { NavController, ModalController } from '@ionic/angular';
import { BusinessResponse } from '../../entity/BusinessEntity';
import { UserInfoEntity } from '../../entity/UserInfoEntity';
import { LoadingController } from '@ionic/angular';

 const apiUrl = "http://192.168.0.99/iInsurePortal/TrustInsurance.API/api/Client/";
 const commonApiUrl = "http://192.168.0.99/iInsurePortal/TrustInsurance.API/api/Common/";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  _Language;
  _UserInfo;
  _IsApp;
  _Param: any;
  _PDFFilePath:string;
  _PolicyURL:string;
  _ObjUserInfo:UserInfoEntity;
  _Loading:any;
  _TransationID:number;
  constructor(private http: HttpClient, public _AlertController: AlertController, public navCtrl: NavController,
    private _Storage: Storage, private _UniqueDeviceID: UniqueDeviceID, public _Platform: Platform,
    public loadingController:LoadingController) { }

  //Post Method
  async fetchDataApi(controllerName: string, data: any, authorization: string = null,
    loggedInUserID: string = null) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'LoggedInUserID': loggedInUserID != null ? loggedInUserID : '',
      'Authorization': authorization != null ? authorization : ''
    });
    let Data = data;

    return new Promise((resolve, reject) => {
      this.http.post(apiUrl + controllerName, Data, { headers })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
          console.log("Error " + err);
        });
    });
  }

  async fetchHeaderApi(controllerName: string, data: any, headerData:any,_loggedInUserID:number,_authorization:string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'LoggedInUserID':_loggedInUserID.toString(),
      'Authorization': _authorization,
      'payment_type': headerData.payment_type,
      'card_number': headerData.card_number,
      'expire_month': headerData.expire_month,
      'expire_year': headerData.expire_year,
      'security_code': headerData.security_code,
      'amount': headerData.amount,
      'currency': headerData.currency
    });
    let Data = data;
    return new Promise((resolve, reject) => {
      this.http.post(commonApiUrl + controllerName, Data, { headers })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
          console.log("Error " + err);
        });
    });
  }

  //Set Value To Storage
  public setStorage(_key, _value) {
    this._Storage.set(_key, _value);
  }


  //get Value from Storage
  public getStorage(_key) {
    return this._Storage.get(_key).then((val) => {
      return val;
    });
  }

  //Delte Value from Storage
  public deleteStorage(_key: string): void {
    this._Storage.remove(_key);
  }

  //Method Device token
  public getDeviceToken() {
    return this._UniqueDeviceID.get()
      .then(uuid => { return uuid })
      .catch((error: any) => console.log(error));
  }

  //Method Get Current Language
  currentLanguage() {
    this.getStorage('Lang').then(data => this._Language = data);
    return this._Language;
  }


  //Method Get User Account
  userInfo() {
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

  //Check a Platform is 
  getPlatform(): boolean {
    if (this._Platform.is('android') || this._Platform.is('ios')) {
      this._IsApp = true;
      return this._IsApp;
    }
    else {
      this._IsApp = false;
      return this._IsApp;
    }
  }

  //Check if online or offline
  public isOnline() {
    this._Platform.ready().then(() => {
      Network.onDisconnect().subscribe(() => {
        console.log("Noo");
      });
      Network.onConnect().subscribe(() => {
        console.log("Yes");
      });
    });
  }

  // To turn on Loading
  async presentLoading(message: string, spinner?) {
    this._Loading = await this.loadingController.create({
      message: message,
      spinner: spinner
    });
    this._Loading.present();
  }
  //To turn off Loading
  hideLoading() {
    this._Loading.dismiss();
  }

}

