import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { GlobalService } from '../../apiCaller/global.service';
import { LoadingController } from '@ionic/angular';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  confirmPassword:any;
  sendData:any;
  
  signUpData={
    FullName:'',
    Password:'',
    EmailAddress:'',
    PhoneNumber:'42455543',
    RoleId:3,
    fkStatusId:1
   }

  constructor(public _GlobalService:GlobalService,
              public _LoadingController:LoadingController, 
              public navCtrl: NavController) { }

  ngOnInit() {}
  login() {this.navCtrl.navigateForward('login')}

  //SignUp Data Method
  signUp(objConfirmPassword) {

    //Get Data From Form
    this.sendData = {
      Data:
      {
        "EmailAddress": this.signUpData.EmailAddress,
        "PhoneNumber": this.signUpData.PhoneNumber,
        "Password": this.signUpData.Password,
        "FullName": this.signUpData.FullName,
        "DeviceToken": "",
        "RoleId": this.signUpData.RoleId,
        "fkStatusId": this.signUpData.fkStatusId
      },
      "Language": "en",
    };


    if (this.signUpData.Password != objConfirmPassword) {
      alert('Password not correct')
    }
    else {
      this._GlobalService.PostData('CreateNewClientAccount', this.sendData);
      this.navCtrl.navigateForward('login')
     // alert('Successfully Registered')
    }
  }
}
