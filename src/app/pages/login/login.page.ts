import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AccountsService } from '../../businessClasses/account/accounts.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss','../../home/home.page.scss'],
  //D:\Projects\iInsureClientApp\src\theme\common.scss
})
export class LoginPage implements OnInit {

  constructor( public navCtrl: NavController,public _AccountsService:AccountsService) { }
  ngOnInit() {
  }

  LoginData = {
    EmailAddress: '',
    PhoneNumber: '',
    Password: ''
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
this.LoginUser();
this.postNewClientAccount('CreateNewClientAccount', this.SendData);
alert('Successfully Registered')

  }
  SignUp(){
  this.navCtrl.navigateForward('signup')
  }
  lostPss(){
   this.navCtrl.navigateForward('lost-pass')
  }
}
