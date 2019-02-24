import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../apiCaller/global.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  payment={
    payment_type:0,
    card_number:0,
    expire_month:0,
    expire_year:'',
    security_code:0,
    amount:0,
    currency:'JOD'
  };
  userID:number=0;
  langId:string;
  accessToken:string;
  transationID:number;
  constructor(public _GlobalService:GlobalService,public navCtrl:NavController) { 
    this.transationID=this._GlobalService._TransationID;
    this._GlobalService.getStorage('UserInfo').then((val) => {
      this.accessToken = val.AccessToken;
      this.userID = val.UserId;
    });
    this._GlobalService.getStorage('Lang').then((val) => {
      this.langId = val;
    });
  }
  ngOnInit() {
  }

  PaymentData() {
    this.payment.expire_year = this.payment.expire_year.toString().substr(-2);
    this.postPayment().then(res => {
      if (res.Success === "true") {
        this._GlobalService.showAlert('', res.ErrorMessage, ['OK']);
        this.navCtrl.navigateForward('successpayment');
      }
      else
        this._GlobalService.showAlert('', res.ErrorMessage, ['OK']);
    });
  }

  postPayment(): Promise<any> {
    let objData = {
      Data: this.transationID,
      Language: this.langId,
      LoggedInUserID: this.userID,
    }
    return this._GlobalService.fetchHeaderApi('ViasMasterCardPayment', objData, this.payment,this.userID,this.accessToken);
  }
}
