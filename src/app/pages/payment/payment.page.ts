import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../apiCaller/global.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  payment = {
    payment_type: 0,
    card_number: 0,
    expire_month: 0,
    expire_year: 0,
    security_code: 0
  }
  constructor(private _GlobalService:GlobalService) { }

  ngOnInit() {
  }

  PaymentData(){

  }

  postPayment(): Promise<any> {
    return this._GlobalService.fetchDataApi('Login',this.payment);
  }

}
