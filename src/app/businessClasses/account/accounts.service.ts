import { Injectable } from '@angular/core';
import { GlobalService } from '../../apiCaller/global.service';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private _GlobalService: GlobalService,public _LoadingController:LoadingController) { }

   PostData(controllerName:string,userData:any):Promise<any> {
    const loading =  this._LoadingController.create({
      message: 'Loading'
    });    
        return new Promise((resolve, reject) => {
          this._GlobalService.PostData(controllerName, userData)
          .subscribe(res => {
           resolve(res);     
        },
        err => {
          console.log(err);        
        });         
      });
  }  
}
