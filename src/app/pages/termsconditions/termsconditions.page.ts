import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { GlobalService } from '../../apiCaller/global.service';
import { DocumentViewer,DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';


@Component({
  selector: 'app-termsconditions',
  templateUrl: './termsconditions.page.html',
  styleUrls: ['./termsconditions.page.scss'],
})
export class TermsconditionsPage implements OnInit {

  constructor(private navCtrl: NavController, private _GlobalService: GlobalService,private document: DocumentViewer) {
  }

  ngOnInit() {

  }
  ionViewDidLoad(){
    const options: DocumentViewerOptions = {
      title: 'My PDF'
    }
    this.document.viewDocument('http://192.168.0.99/iInsurePortal/TrustInsurance.UI/Files/PDFFile//20190101040946-2018%20Travel%20Insurance%20Jacket%20-%20Arabic.pdf', 'application/pdf', options)
    console.log(this._GlobalService._PDFFilePath);
  }

  Next() {
    this.navCtrl.navigateForward('policyview');
  }

  Previous() {
    this.navCtrl.pop();
  }
}
