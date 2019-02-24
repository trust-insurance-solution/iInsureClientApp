import { Component, OnInit } from '@angular/core';
import { GlobalService} from '../../apiCaller/global.service'


@Component({
  selector: 'app-successpayment',
  templateUrl: './successpayment.page.html',
  styleUrls: ['./successpayment.page.scss'],
})
export class SuccesspaymentPage implements OnInit {
  PdfUrl:string;
  constructor(private _GlobalService:GlobalService) {
    this.PdfUrl=this._GlobalService._PolicyShortPdf;
   }

  ngOnInit() {
  }

}
