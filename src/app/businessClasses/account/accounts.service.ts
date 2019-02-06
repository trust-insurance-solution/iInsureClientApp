import { Injectable } from '@angular/core';
import { GlobalService } from '../../apiCaller/global.service';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private _GlobalService: GlobalService,public _LoadingController:LoadingController) { }

  // SignUp Method
   SignUp(controllerName:string,userData:any) {
    const loading =  this._LoadingController.create({
      message: 'Loading'
    });    
    return this._GlobalService.PostData(controllerName, userData);
  } 

    // Login Method
    Login(controllerName:string,userData:any) {
      const loading =  this._LoadingController.create({
        message: 'Loading'
      });    
      return this._GlobalService.PostData(controllerName, userData);
    } 
}
