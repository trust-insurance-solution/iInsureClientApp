import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AccountsService } from '../../businessClasses/account/accounts.service';
//import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  //D:\Projects\iInsureClientApp\src\theme\common.scss
})
export class LoginPage implements OnInit {
  deviceToken;
  constructor(public navCtrl: NavController, public _AccountsService: AccountsService) { }
  ngOnInit() {
    
  /* this.uniqueDeviceID.get()
      .then((uuid: any) => console.log(uuid))
      .catch((error: any) => console.log(error));
      */
  }

  LoginData = {
    EmailAddress: "",
    PhoneNumber: "",
    Password: ""
  }

  SendData = {
    Data:
    {
      "EmailAddress": this.LoginData.EmailAddress,
      "PhoneNumber": this.LoginData.EmailAddress,
      "Password": this.LoginData.Password
    },
    "Language": "en",
  };
  LoginUser() {
    this._AccountsService.PostData('Login', this.SendData);
    alert('Successfully Registered')
  }
  SignUp() {
    this.navCtrl.navigateForward('signup')
  }
  forgotPss() {
    this.navCtrl.navigateForward('forgot-pass')
  }
}
