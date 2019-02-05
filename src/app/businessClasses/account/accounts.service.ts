import { Injectable } from '@angular/core';
import { GlobalService } from '../../apiCaller/global.service';
import { Observable, of, throwError } from 'rxjs';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private _GlobalService: GlobalService,public _LoadingController:LoadingController) { }

/*
  PostData(controllerName: string, data) {
    return this._GlobalService.PostData(controllerName, data);
  }
*/
  async PostData(controllerName:string,userData:any) {
    const loading = await this._LoadingController.create({
      message: 'Loading'
    });
    await loading.present();

   return this._GlobalService.PostData(controllerName, userData)
        .subscribe(res => {
          console.log(res);
          loading.dismiss();
        },
        err => {
          console.log(err);
          loading.dismiss();
        });
  }

}
