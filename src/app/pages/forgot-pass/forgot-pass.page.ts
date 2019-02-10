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
  deviceToken;
  constructor(public navCtrl: NavController, public _GlobalService: GlobalService, public showAlert: AlertController) {
    this.deviceToken = !this._GlobalService.getPlatform() ? this._GlobalService.getDeviceToken() : "cbF1x6YK4_w:APA91bEZOJLaN5ZO8wfRB6WyyLIQZ_29E0RLlU4ssd7rqEOxAP1AXYCOBE07-jBQyyn6zKY6MUrqXNFIZsS186Pg-fGMeOSwoHq1tJYv53V_BYHEduiT8CehSlxpObifuMOmuDEZZWQb";
   }

  ngOnInit() {
  }

  forgetPassword() {
    this.forgetData = {
      Data:
      {
        "EmailAddress": this.email,
        "PhoneNumber": this.email,
        "DeviceToken": this.deviceToken
      },
      "Language": "en"
    };
    this.postForgotPassword().then(data => {
      if (data.Success === 'true')
        this._GlobalService.showAlert('Sign-in Failed', data.ErrorMessage, ['OK']);
      else
        this._GlobalService.showAlert('Sign-in Failed', data.ErrorMessage, ['OK']);
    });
    this.email = '';
  }

  postForgotPassword(): Promise<any> {
    return this._GlobalService.fetchDataApi('ForgotPassword', this.forgetData)
  }
}
