import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { GlobalService } from '../../apiCaller/global.service';
import { LoadingController } from '@ionic/angular';
import { IonicSelectableModule, IonicSelectableComponent } from 'ionic-selectable';
import { stringify } from '@angular/core/src/util';
import { FormsModule, Validators, FormControl, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss']
})



export class SignupPage implements OnInit {
  allInfo = true
  objSignUp: any;
  countries: any;
  country: number = -1;
  agreed: boolean = false;

  formgroup: FormGroup
  FullName: AbstractControl
  EmailAddress: AbstractControl
  PhoneNumber: AbstractControl
  Password: AbstractControl
  confirmPassword: AbstractControl
  countr: AbstractControl;
  check: AbstractControl
  mail: "/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/"

  constructor(public _GlobalService: GlobalService,
    public _LoadingController: LoadingController,
    public navCtrl: NavController,
    public formbuilder: FormBuilder, ) {

    //FORM
    this.formgroup = formbuilder.group({
      FullName: new FormControl('', Validators.compose([
        Validators.maxLength(8),
        Validators.pattern('[a-zA-Z ]*'),
        Validators.required])),

      EmailAddress: new FormControl('', Validators.compose([
        Validators.maxLength(30),
        Validators.pattern(this.mail),
        Validators.required])),

      PhoneNumber: new FormControl('', Validators.compose([
        Validators.maxLength(15),
        Validators.pattern('[0-9]*'),
        Validators.required])),

      Password: new FormControl('', Validators.compose([
        Validators.minLength(7),
        Validators.pattern('[a-zA-Z0-9!!#$%&*+\/=?^_`{|}~.-]*'),
        Validators.required])),

      confirmPassword: new FormControl('', Validators.compose([
        Validators.minLength(7),
        Validators.pattern('[a-zA-Z0-9!!#$%&*+\/=?^_`{|}~.-]*'),
        Validators.required])),

      countr: new FormControl('', Validators.compose([
        Validators.required])),

      check: new FormControl('', Validators.compose([
        Validators.required])),
    });

    this.FullName = this.formgroup.controls['FullName']
    this.EmailAddress = this.formgroup.controls['EmailAddress']
    this.PhoneNumber = this.formgroup.controls['PhoneNumber']
    this.Password = this.formgroup.controls['Password']
    this.confirmPassword = this.formgroup.controls['confirmPassword']
    this.countr = this.formgroup.controls['countr']
    this.check = this.formgroup.controls['check']


  }
  onSubmit(value: any): void {
    if (this.formgroup.valid) {
      console.log(this.FullName)

      //window.localStorage.setItem('password', value.password);    
    }
  }

  runTimeChange(ev: any) {
    let val = ev.target.value;
    console.log("Ddddddddddd " + val.value)
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


}