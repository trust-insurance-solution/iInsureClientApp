import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../apiCaller/global.service';
import {  BusinessResponse } from '../../../entity/BusinessEntity';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.page.html',
  styleUrls: ['./quotation.page.scss'],
})
export class QuotationPage implements OnInit {
  lstQuotation:BusinessResponse[];
  transationID:number;
  lineOfBusiness:number;
  userID:number;
  accessToken:string;
  constructor(public _GlobalService: GlobalService,private navCtrl: NavController) {
    this._GlobalService.getStorage('UserInfo').then((val) => {
      this.userID = val.UserId;
    });
    this.accessToken = "TGtNc2w5VXFPb2xEMzJhWVNvazBaTStMeC9uVFE4N04weUFiY3BzN3Fwaz06Mi8xOS8yMDE5OjYzNjg2MTg5ODgzNDA3ODYxNw==";
  }

  ngOnInit() {
    this.lstQuotation =this._GlobalService._Param!=null ? this._GlobalService._Param.Data.CompanyListResult:null;
    this.transationID =this._GlobalService._Param!=null? this._GlobalService._Param.ReturnTransactionId:null;
    this.lineOfBusiness = 5;
  }

  AssignPlanToTransaction(PlanDetailId, CompanyId, TransationID, lineOfBusiness,PDFFilePath) {
    this._GlobalService._PDFFilePath=PDFFilePath;
    this.getCountries(PlanDetailId, CompanyId, TransationID, lineOfBusiness).then(res => {
      if (res.Success === 'true') {
        this.navCtrl.navigateForward('termsconditions');
      }
    });
  }

  getCountries(PlanDetailId, CompanyId, TransationID, lineOfBusiness): Promise<any> {
    let data = {
      Data: {
        PlanDetailId: PlanDetailId,
        TransactionId: TransationID,
        LineOfBusiness: lineOfBusiness,
        CompanyId: CompanyId
      },
      Language: "en",
      LoggedInUserID: this.userID,
    }
    return this._GlobalService.fetchDataApi('AssignPlanToTransaction', data, this.accessToken, this.userID.toString());
  }

}
