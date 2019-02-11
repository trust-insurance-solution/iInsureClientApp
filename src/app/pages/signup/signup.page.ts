import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { GlobalService } from '../../apiCaller/global.service';
import { LoadingController } from '@ionic/angular';
import { IonicSelectableModule, IonicSelectableComponent } from 'ionic-selectable';
import { stringify } from '@angular/core/src/util'; 
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
 

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss']
})



export class SignupPage implements OnInit {
  confirmPassword: any;
  allInfo = true
  objSignUp: any;
  countries: any;
  country: number = -1;
  agreed: boolean = false;



  constructor(public _GlobalService: GlobalService,
    public _LoadingController: LoadingController,
    public navCtrl: NavController) {
  }


  async ngOnInit() {
    await this.getCountries().then(result => this.countries = result.Data);

  }

  objUserInfo = {
    Data: {
      FullName: '',
      EmailAddress: '',
      PhoneNumber: '',
      Password: '',
      DeviceToken: '',

    },
    Language: ''
  }

  login() { this.navCtrl.navigateForward('login') }

  //SignUp Data Method
  signUp(objConfirmPassword) {
    this._GlobalService.getStorage("Lang").then(val => { this.objUserInfo.Language = val; });
    this.objUserInfo.Data.DeviceToken = this._GlobalService.getPlatform() ? '"' + this._GlobalService.getDeviceToken() + '"' : "cbF1x6YK4_w:APA91bEZOJLaN5ZO8wfRB6WyyLIQZ_29E0RLlU4ssd7rqEOxAP1AXYCOBE07-jBQyyn6zKY6MUrqXNFIZsS186Pg-fGMeOSwoHq1tJYv53V_BYHEduiT8CehSlxpObifuMOmuDEZZWQb";


    if (this.objUserInfo.Data.Password != objConfirmPassword) {
      alert('Password not correct')
    }
    else {
      console.log(this.allInfo)
      this.allInfo = true
      console.log(this.allInfo)

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
    return this._GlobalService.fetchDataApi('CreateNewClientAccount', this.objUserInfo)
  }

  //Event for selectable Component
  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('port:', event.value);
  }

}