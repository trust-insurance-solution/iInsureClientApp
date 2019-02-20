import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../apiCaller/global.service';
import {  BusinessResponse } from '../../../entity/BusinessEntity';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.page.html',
  styleUrls: ['./quotation.page.scss'],
})
export class QuotationPage implements OnInit {
  lstQuotation:BusinessResponse[];
  constructor(public _GlobalService:GlobalService) { }

  ngOnInit() {
    this.lstQuotation = this._GlobalService._Param;
  }

}
