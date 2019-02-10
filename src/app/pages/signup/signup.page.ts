import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { GlobalService } from '../../apiCaller/global.service';
import { LoadingController } from '@ionic/angular';
import { IonicSelectableModule, IonicSelectableComponent } from 'ionic-selectable';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  confirmPassword: any;
  sendData: any;

  signUpData = {
    FullName: '',
    Password: '',
    EmailAddress: '',
    PhoneNumber: '',
    RoleId: 3,
    fkStatusId: 1
  }

  Country: Country[];
  country: Country;

  constructor(public _GlobalService: GlobalService,
    public _LoadingController: LoadingController,
    public navCtrl: NavController) {

    this.Country = [
      //A
      { id: 1, name: 'Afghanistan' },
      { id: 2, name: 'Albania ' },
      { id: 3, name: 'Algeria' },
      { id: 4, name: 'Andorra ' },
      { id: 5, name: 'Angola ' },
      { id: 6, name: 'Antigua and Barbuda ' },
      { id: 7, name: 'Argentina ' },
      { id: 8, name: 'Armenia ' },
      { id: 9, name: 'Australia ' },
      { id: 10, name: 'Austria ' },
      { id: 11, name: 'Azerbaijan' },
      //B
      { id: 12, name: 'The Bahamas' },
      { id: 13, name: 'Bahrain' },
      { id: 14, name: 'Bangladesh' },
      { id: 15, name: 'Barbados' },
      { id: 16, name: 'Belarus' },
      { id: 17, name: 'Belgium' },
      { id: 18, name: 'Belize' },
      { id: 19, name: 'Benin' },
      { id: 20, name: 'Bhutan' },
      { id: 21, name: 'Bolivia' },
      { id: 22, name: 'Bosnia and Herzegovina' },
      { id: 23, name: 'Botswana' },
      { id: 24, name: 'Brazil' },
      { id: 25, name: 'Brunei' },
      { id: 26, name: 'Bulgaria' },
      { id: 27, name: 'Burkina Faso' },
      { id: 28, name: 'Burundi' },
      //C
      { id: 29, name: 'Cabo Verde' },
      { id: 30, name: 'Cambodia' },
      { id: 31, name: 'Cameroon' },
      { id: 32, name: 'Canada' },
      { id: 33, name: 'Central African Republic' },
      { id: 34, name: 'Chad' },
      { id: 35, name: 'Chile' },
      { id: 36, name: 'China' },
      { id: 37, name: 'Colombia' },
      { id: 38, name: 'Comoros' },
      { id: 39, name: 'Congo, Democratic Republic of the' },
      { id: 40, name: 'Congo, Republic of the' },
      { id: 41, name: 'Costa Rica' },
      { id: 42, name: 'Côte d’Ivoire' },
      { id: 43, name: 'Croatia' },
      { id: 44, name: 'Cuba' },
      { id: 45, name: 'Cyprus' },
      { id: 46, name: 'Czech Republic' },
      //D
      { id: 47, name: 'Denmark' },
      { id: 48, name: 'Djibouti' },
      { id: 49, name: 'Dominica' },
      { id: 50, name: 'Dominican Republic' },
      //E
      { id: 51, name: 'East Timor (Timor-Leste)' },
      { id: 52, name: 'Ecuador' },
      { id: 53, name: 'Egypt' },
      { id: 54, name: 'El Salvador' },
      { id: 55, name: 'Equatorial Guinea' },
      { id: 56, name: 'Eritrea' },
      { id: 57, name: 'Estonia' },
      { id: 58, name: 'Ethiopia' },
      //F
      { id: 59, name: 'Fiji' },
      { id: 60, name: 'Finland' },
      { id: 61, name: 'France' },
      //G
      { id: 62, name: 'Gabon' },
      { id: 63, name: 'The Gambia' },
      { id: 64, name: 'Georgia' },
      { id: 65, name: 'Germany' },
      { id: 66, name: 'Ghana' },
      { id: 67, name: 'Greece' },
      { id: 68, name: 'Grenada' },
      { id: 69, name: 'Guatemala' },
      { id: 70, name: 'Guinea' },
      { id: 71, name: 'Guinea-Bissau' },
      { id: 72, name: 'Guyana' },
      //H
      { id: 73, name: 'Haiti' },
      { id: 74, name: 'Honduras' },
      { id: 75, name: 'Hungary' },
      //I
      { id: 76, name: 'Iceland' },
      { id: 77, name: 'India' },
      { id: 78, name: 'Indonesia' },
      { id: 79, name: 'Iran' },
      { id: 80, name: 'Iraq' },
      { id: 81, name: 'Ireland' },
      { id: 82, name: 'Israel' },
      { id: 83, name: 'Italy' },
      //J
      { id: 84, name: 'Jamaica' },
      { id: 85, name: 'Japan' },
      { id: 86, name: 'Jordan' },
      //K
      { id: 89, name: 'Kazakhstan' },
      { id: 90, name: 'Kenya' },
      { id: 91, name: 'Kiribati' },
      { id: 92, name: 'Korea, North' },
      { id: 93, name: 'Korea, South' },
      { id: 94, name: 'Kosovo' },
      { id: 95, name: 'Kuwait' },
      { id: 96, name: 'Kyrgyzstan' },
      //L
      { id: 77, name: 'Laos' },
      { id: 78, name: 'Latvia' },
      { id: 79, name: 'Lebanon' },
      { id: 80, name: 'Lesotho' },
      { id: 81, name: 'Liberia' },
      { id: 82, name: 'Libya' },
      { id: 83, name: 'Liechtenstein' },
      { id: 94, name: 'Lithuania' },
      { id: 95, name: 'Luxembourg' },
      //M
      { id: 96, name: 'Macedonia' },
      { id: 77, name: 'Madagascar' },
      { id: 78, name: 'Malawi' },
      { id: 79, name: 'Malaysia' },
      { id: 80, name: 'Maldives' },
      { id: 81, name: 'Mali' },
      { id: 82, name: 'Malta' },
      { id: 83, name: 'Marshall Islands' },
      { id: 94, name: 'Mauritania' },
      { id: 95, name: 'Mauritius' },
      { id: 96, name: 'Mexico' },
      { id: 77, name: 'Micronesia, Federated States of' },
      { id: 78, name: 'Moldova' },
      { id: 79, name: 'Monaco' },
      { id: 80, name: 'Mongolia' },
      { id: 81, name: 'Montenegro' },
      { id: 82, name: 'Morocco' },
      { id: 83, name: 'Mozambique' },
      { id: 94, name: 'Myanmar (Burma)' },
      //N
      { id: 95, name: 'Namibia' },
      { id: 96, name: 'Nauru' },
      { id: 77, name: 'Nepal' },
      { id: 78, name: 'Netherlands' },
      { id: 79, name: 'New Zealand' },
      { id: 80, name: 'Nicaragua' },
      { id: 81, name: 'Niger' },
      { id: 82, name: 'Nigeria' },
      { id: 83, name: 'Norway' },
      //O
      { id: 94, name: 'Oman' },
      //P
      { id: 95, name: 'Pakistan' },
      { id: 96, name: 'Palau' },
      { id: 77, name: 'Panama' },
      { id: 78, name: 'Papua New Guinea' },
      { id: 79, name: 'Paraguay' },
      { id: 80, name: 'Peru' },
      { id: 81, name: 'Philippines' },
      { id: 82, name: 'Poland' },
      { id: 83, name: 'Portugal' },
      //Q
      { id: 94, name: 'Qatar' },
      
    ];
  }

  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('port:', event.value);
  }

  ngOnInit() { }
  login() { this.navCtrl.navigateForward('login') }

  //SignUp Data Method
  signUp(objConfirmPassword) {

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
      this._GlobalService.PostData('CreateNewClientAccount', this.sendData).then(data => {
        if (data[0].Success === 'true') {
          this._GlobalService.setStorage('UserInfo', data[0]);
          this.navCtrl.navigateForward('login')
        }
        else {
          this._GlobalService.showAlert('Sign-up Failed', data[0].ErrorMessage, ['OK']);
        }
      });
    }


  }
}

class Country {
  public id: number;
  public name: string;
}