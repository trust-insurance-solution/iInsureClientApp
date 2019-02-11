import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { GlobalService } from '../../apiCaller/global.service';
import { LoadingController } from '@ionic/angular';

import { SignUpEntity } from '../../../entity/SignUpEntity';
import { IonicSelectableModule, IonicSelectableComponent } from 'ionic-selectable';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  confirmPassword: any;


  objSignUp: any;
  countries: any;
  country: number = -1;

  signUpData = {
    FullName: '',
    Password: '',
    EmailAddress: '',
    PhoneNumber: '',
    RoleId: 3,
    fkStatusId: 1
  }


  constructor(public _GlobalService: GlobalService,
    public _LoadingController: LoadingController,
    public navCtrl: NavController) { }




  async ngOnInit() {
    await this.getCountries().then(result => this.countries = result.Data);
  }
  
  login() { this.navCtrl.navigateForward('login') }

  //SignUp Data Method
  signUp(objConfirmPassword) {

    this.objSignUp = {
      Data:
      {
        "EmailAddress": this.signUpData.EmailAddress,
        "PhoneNumber": this.signUpData.PhoneNumber,
        "Password": this.signUpData.Password,
        "FullName": this.signUpData.FullName,
        "Country": this.country > 0 ? this.country : null,

        "DeviceToken": this._GlobalService.getPlatform() ? '"' + this._GlobalService.getDeviceToken() + '"' : "cbF1x6YK4_w:APA91bEZOJLaN5ZO8wfRB6WyyLIQZ_29E0RLlU4ssd7rqEOxAP1AXYCOBE07-jBQyyn6zKY6MUrqXNFIZsS186Pg-fGMeOSwoHq1tJYv53V_BYHEduiT8CehSlxpObifuMOmuDEZZWQb",

        "RoleId": this.signUpData.RoleId,
        "fkStatusId": this.signUpData.fkStatusId
      },
      "Language": "en",
    };

    if (this.signUpData.Password != objConfirmPassword) {
      alert('Password not correct')
    }
    else {
      this.postCreateNewClientAccount().then(data => {
        if (data.Success === 'true') {
          this._GlobalService.setStorage('UserInfo', data[0]);
          this.navCtrl.navigateForward('login')
        }
        else {
          this._GlobalService.showAlert('Sign-up Failed', data.ErrorMessage, ['OK']);
        }
      });
    }
  }

  //Get a countries
  getCountries(): Promise<any> {
    return this._GlobalService.fetchDataApi('GetAllCountryList', {});
  }

  //Post Create New Client Account
  postCreateNewClientAccount(): Promise<any> {
    return this._GlobalService.fetchDataApi('CreateNewClientAccount', this.objSignUp)
  }

  //Event for Selectable Component
  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('port:', event.value);
  }

}