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
  deviceToken;
  Lang:string;
  loginData = {
    Data:
    {
      EmailAddress: '',
      PhoneNumber: '',
      Password: '',
      DeviceToken: ''
    },
    Language: ''
  };
  ResponseData: any;
  userInfo: any;


  constructor(public navCtrl: NavController,
    public _GlobalService: GlobalService,
    private uniqueDeviceID: UniqueDeviceID,
    public alertController: AlertController) {
    this.deviceToken = !this._GlobalService.getPlatform() ? this._GlobalService.getDeviceToken() : "cbF1x6YK4_w:APA91bEZOJLaN5ZO8wfRB6WyyLIQZ_29E0RLlU4ssd7rqEOxAP1AXYCOBE07-jBQyyn6zKY6MUrqXNFIZsS186Pg-fGMeOSwoHq1tJYv53V_BYHEduiT8CehSlxpObifuMOmuDEZZWQb";
    this._GlobalService.getStorage('Lang').then((val) => {
      this.Lang = val;
    });
  }

  LoginUser() {
    this.loginData.Data.DeviceToken = this.deviceToken;
    this.loginData.Data.PhoneNumber = this.loginData.Data.EmailAddress;
    this.loginData.Language = this.Lang;

    this.postLogin().then(res => {
      if (res.Success === 'true') {
        console.log(this.loginData);
        this._GlobalService.setStorage('UserInfo', res.Data);
        this.navCtrl.navigateForward('home');
      }
      else {
        this._GlobalService.showAlert('Sign-in Failed', res.ErrorMessage, ['OK']);
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
    return this._GlobalService.fetchDataApi('Login', this.loginData);
  }
}


