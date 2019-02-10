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
  objSignUp: SignUpEntity;
  countries:any;
  country:number=-1;

  /*signUpData = {
    FullName: '',
    Password: '',
    EmailAddress: '',
    PhoneNumber: '',
    RoleId: 3,
    fkStatusId: 1
  }
*/


    Country: -1;
    fkStatusId: 1;
    DeviceToken:''

  
  constructor(public _GlobalService: GlobalService,
    public _LoadingController: LoadingController,
    public navCtrl: NavController) {

  
  }

  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('port:', event.value);
  }

    
  async ngOnInit() {
     await this.getCountries().then(result => this.countries= result.Data);
   }
  login() { this.navCtrl.navigateForward('login') }

  //SignUp Data Method
  signUp(objConfirmPassword) {
    this.objSignUp.Data.DeviceToken = this._GlobalService.getPlatform() ? "'"+this._GlobalService.getDeviceToken()+"'" : "cbF1x6YK4_w:APA91bEZOJLaN5ZO8wfRB6WyyLIQZ_29E0RLlU4ssd7rqEOxAP1AXYCOBE07-jBQyyn6zKY6MUrqXNFIZsS186Pg-fGMeOSwoHq1tJYv53V_BYHEduiT8CehSlxpObifuMOmuDEZZWQb";
    this.objSignUp.Data.RoleId=3;
    this.objSignUp.Data.fkStatusId=1;
    this.objSignUp.Language="en";


    if (this.objSignUp.Data.Password != objConfirmPassword) {
      alert('Password not correct')
    }
    else {
      this.postCreateNewClientAccount().then(data =>{
        if(data.Success === 'true') {
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
}

class Country {
  public id: number;
  public name: string;
}