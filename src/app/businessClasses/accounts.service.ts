import { Injectable } from '@angular/core';
import { GlobalService } from '../apiCaller/global.service';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private _GlobalService: GlobalService) { }


  PostData(controllerName: string, data) {
    return this._GlobalService.PostData(controllerName, data);
  }

}
