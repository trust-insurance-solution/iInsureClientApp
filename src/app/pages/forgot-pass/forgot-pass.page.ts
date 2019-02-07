import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { GlobalService } from '../../apiCaller/global.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.page.html',
  styleUrls: ['./forgot-pass.page.scss'],
})
export class ForgotPassPage implements OnInit {
  forgetData: any;
  email: string;
  constructor(public navCtrl: NavController, public _GlobalService: GlobalService, public showAlert: AlertController) { }

  ngOnInit() {
  }

  forgetPassword() {
    this.forgetData = {
      Data:
      {
        "EmailAddress": this.email,
        "PhoneNumber": this.email,
        "DeviceToken": "cbF1x6YK4_w:APA91bEZOJLaN5ZO8wfRB6WyyLIQZ_29E0RLlU4ssd7rqEOxAP1AXYCOBE07-jBQyyn6zKY6MUrqXNFIZsS186Pg-fGMeOSwoHq1tJYv53V_BYHEduiT8CehSlxpObifuMOmuDEZZWQb"
      },
      "Language": "en"
    };
    this._GlobalService.PostData('ForgotPassword', this.forgetData).then(data => {
      if (data[0].Success === 'true')
        this._GlobalService.showAlert('Sign-in Failed', data[0].ErrorMessage, ['OK']);
      else
        this._GlobalService.showAlert('Sign-in Failed', data[0].ErrorMessage, ['OK']);
    });
    this.email = '';
  }
}
