import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { GlobalService } from '../../apiCaller/global.service';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  movie;
  deviceToken;
  sendData: any;
  ResponseData: any;
  LoginData = {
    EmailAddress: "",
    PhoneNumber: "",
    Password: ""
  }

  constructor(public navCtrl: NavController,
    public _GlobalService: GlobalService,
    private uniqueDeviceID: UniqueDeviceID,
    public alertController: AlertController) {
    this.deviceToken = !this._GlobalService.getPlatform() ? this._GlobalService.getDeviceToken() : "cbF1x6YK4_w:APA91bEZOJLaN5ZO8wfRB6WyyLIQZ_29E0RLlU4ssd7rqEOxAP1AXYCOBE07-jBQyyn6zKY6MUrqXNFIZsS186Pg-fGMeOSwoHq1tJYv53V_BYHEduiT8CehSlxpObifuMOmuDEZZWQb";
  }

  LoginUser() {
    this.sendData = {
      Data:
      {
        "EmailAddress": this.LoginData.EmailAddress,
        "PhoneNumber": this.LoginData.EmailAddress,
        "Password": this.LoginData.Password,
        "DeviceToken": this.deviceToken
      },
      "Language": "en",
    };
    this.postLogin().then(data => {
      if (data.Success === 'true') {
        this._GlobalService.setStorage('Name', 'Fares');
        this._GlobalService.getStorage('Name').then(data => this.movie = data);
        this.navCtrl.navigateForward('home');
      }
      else {
        this._GlobalService.showAlert('Sign-in Failed', data.ErrorMessage, ['OK']);
      }
    });
  }
  ngOnInit() { }
  SignUp() {
    this.navCtrl.navigateForward('signup')
  }
  forgotPss() {
    this.navCtrl.navigateForward('forgot-pass')
  }
  postLogin(): Promise<any> {
    return this._GlobalService.fetchDataApi('Login', this.sendData)
  }
}


