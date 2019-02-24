import { Component, OnInit } from '@angular/core';
import { DocumentViewer,DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { GlobalService } from '../../apiCaller/global.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-policyview',
  templateUrl: './policyview.page.html',
  styleUrls: ['./policyview.page.scss'],
})
export class PolicyviewPage implements OnInit {

  constructor(private document: DocumentViewer, private _GlobalService: GlobalService, public navCtrl: NavController) {
    const options: DocumentViewerOptions = {
      title: 'My PDF'
    }
    this.document.viewDocument('http://192.168.0.99/iInsurePortal/TrustInsurance.UI/Files/PDFFile//20190101040946-2018%20Travel%20Insurance%20Jacket%20-%20Arabic.pdf', 'application/pdf', options)
    //this._GlobalService._PolicyURL
  }
  GoToPayment() {
    this.navCtrl.navigateForward('payment');
  }
  ngOnInit() {
  }

}
