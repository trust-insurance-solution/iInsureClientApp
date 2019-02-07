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
  SendData: any;
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
    this.deviceToken = this.uniqueDeviceID.get()
      .then((uuid: any) => console.log(uuid))
      .catch((error: any) => console.log(error));
  }
  MyData;
  LoginUser() {
    this.SendData = {
      Data:
      {
        "EmailAddress": this.LoginData.EmailAddress,
        "PhoneNumber": this.LoginData.EmailAddress,
        "Password": this.LoginData.Password,
        "DeviceToken":this._GlobalService.getPlatform() ? this._GlobalService.getDeviceToken(): "cbF1x6YK4_w:APA91bEZOJLaN5ZO8wfRB6WyyLIQZ_29E0RLlU4ssd7rqEOxAP1AXYCOBE07-jBQyyn6zKY6MUrqXNFIZsS186Pg-fGMeOSwoHq1tJYv53V_BYHEduiT8CehSlxpObifuMOmuDEZZWQb"
      },
      "Language": "en",
    };
    this._GlobalService.postData('Login', this.SendData).then(data => {
      if (data[0].Success === 'true') {
        this._GlobalService.setStorage('Name', 'Fares');
        this._GlobalService.getStorage('Name').then(data => this.movie = data);
        this.navCtrl.navigateForward('home');
      }
      else {
        this._GlobalService.showAlert('Sign-in Failed', data[0].ErrorMessage, ['OK']);
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
}


