import { Component } from '@angular/core';
import {GlobalService}  from '../services/global.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  resultMessage:any;
  constructor(public _GlobalService: GlobalService) {


   }

   SaveData(){
  
    let data={
        "FullName": "Faresss1",
        "EmailAddress": "fareselkh865@yahoo.com",
        "PhoneNumber": "42364384",
        "Password": "43243fd",
        "CountryId": 81   
    }

   this.resultMessage=this._GlobalService.postService('s',data);

console.log(data.FullName);

   }


}
