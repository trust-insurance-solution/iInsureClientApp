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
    this.deviceToken = !this._GlobalService.getPlatform() ? this._GlobalService.getDeviceToken() : "ZWw5TWVsdmhNdk5TOWlxbEMxeW1JOUI4endCMTVLNEpEaFhTV1ZMUmNaOD06Mi8xNy8yMDE5OjYzNjg2MDA4MTgyNzEwNjk5NQ==";
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


