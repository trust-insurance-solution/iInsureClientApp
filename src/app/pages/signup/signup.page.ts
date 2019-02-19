import { Component, OnInit, Input } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { GlobalService } from '../../apiCaller/global.service';
import { LoadingController } from '@ionic/angular';
import { IonicSelectableModule, IonicSelectableComponent } from 'ionic-selectable';
import { stringify } from '@angular/core/src/util';
import { FormsModule, Validators, FormControl, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss']
})

export class SignupPage implements OnInit {
  myphoto: any

  err: boolean = false;
  showPwd: boolean
  trans_FullName: string;
  allInfo = true
  objSignUp: any;
  countries: any;
  cities: any;
  isValid: boolean = false;
  country: number = 0;
  cityId: number = 0;
  agreed: boolean = false;
  checkbox: boolean = false
  countryId: number = 0;
  formgroup: FormGroup
  FullName: AbstractControl
  EmailAddress: AbstractControl
  PhoneNumber: AbstractControl
  Password: AbstractControl

  birthd: AbstractControl
  gender: AbstractControl
  city: AbstractControl
  countr: AbstractControl;
  check: AbstractControl
  mail: "/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/"

  constructor(public _GlobalService: GlobalService,
    public _LoadingController: LoadingController,
    public navCtrl: NavController,
    public formbuilder: FormBuilder, 
    public translate: TranslateService,
    private _Platform: Platform,
    private camera: Camera) {

    this._GlobalService.getStorage("Lang").then(val => { this.objUserInfo.Language = val; });
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


      countr: new FormControl('', Validators.compose([
        Validators.required])),

      check: new FormControl('', Validators.compose([
        Validators.required])),

      birthd: new FormControl('', Validators.compose([
        Validators.required])),

      gender: new FormControl('', Validators.compose([
        Validators.required])),

      city: new FormControl('', Validators.compose([
        Validators.required])),


    });

    this.FullName = this.formgroup.controls['FullName']
    this.EmailAddress = this.formgroup.controls['EmailAddress']
    this.PhoneNumber = this.formgroup.controls['PhoneNumber']
    this.Password = this.formgroup.controls['Password']
    this.countr = this.formgroup.controls['countr']
    this.check = this.formgroup.controls['check']

    this.birthd = this.formgroup.controls['birthd']
    this.gender = this.formgroup.controls['gender']
    this.city = this.formgroup.controls['city']
  }


  onSubmit(value: any): void {
    if (this.formgroup.valid) {
      console.log(this.FullName)

      //window.localStorage.setItem('password', value.password);    
    }
  }
  runTimeChange(ev: any) {
    let val = ev.target.value;
  }
  async ngOnInit() {
    await this.getCountries().then(result => this.countries = result.Data);
  }
  objUserInfo = {
    Data: {
      FullName: '',
      EmailAddress: '',
      PhoneNumber: '',
      DateOfBirth: '',
      Password: '',
      Gender: 0,
      country: 0,
      GovernorateId: 0,
      DeviceToken: '',
      FkMachineType: 0
    },
    Language: ''
  }
  login() { this.navCtrl.navigateForward('login') }
  //Get a countries
  getCountries(): Promise<any> {
    return this._GlobalService.fetchDataApi('GetAllCountryList', {});
  }
  //Get a cites
  getCites(CountryId): Promise<any> {
    let item = {
      "Data": CountryId,
      "Language": "string"
    };
    return this._GlobalService.fetchDataApi('GetCitiesListByCountryId', item);
  }
  //Post Create New Client Account
  postCreateNewClientAccount(): Promise<any> {
    return this._GlobalService.fetchDataApi('CreateNewClientAccount', this.objUserInfo)
  }

  //
  postGetClientInformationByID(UserID): Promise<any> {
    let data = {
      Data: UserID,
      Language: this.objUserInfo.Language,
    }
    return this._GlobalService.fetchDataApi('GetClientInformationByID', data)
  }
  //Event for selectable Component country
  async Nationality(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    // 
    this.countryId = event.value.Id;
    await this.getCites(event.value.Id).then(result => this.cities = result.Data);
  }
  //Event for selectable Component city
  cityChange(event: {
    component: IonicSelectableComponent,
    value: any,
  }) {
    this.objUserInfo.Data.GovernorateId = event.value.GovernorateId;
  }
  //SignUp Data Method
  signUp() {
    this.objUserInfo.Data.country = this.countryId;
    this.objUserInfo.Data.FkMachineType = this.getDeviceType();
    this.objUserInfo.Data.DeviceToken = this._GlobalService.getPlatform() ? '"' + this._GlobalService.getDeviceToken() + '"' : "cbF1x6YK4_w:APA91bEZOJLaN5ZO8wfRB6WyyLIQZ_29E0RLlU4ssd7rqEOxAP1AXYCOBE07-jBQyyn6zKY6MUrqXNFIZsS186Pg-fGMeOSwoHq1tJYv53V_BYHEduiT8CehSlxpObifuMOmuDEZZWQb";
    this.postCreateNewClientAccount().then(data => {
      if (data.Success === 'true') {
       let UserID= data.ReturnUserId;
        this.postGetClientInformationByID(UserID).then(
          res => { this._GlobalService.setStorage('UserInfo', res.Data); }
        );
        this.navCtrl.navigateForward('verification')
      }
      else {
        this._GlobalService.showAlert('Sign-up Failed', data.ErrorMessage, ['OK']);
      }
    });
  }
  //Translated
  ionViewWillEnter() {
    this.translate.get(['SignUpPageFullName']).subscribe(
      value => {
        this.trans_FullName = value.SignUpPageFullName;
      }
    );
  }
  getDeviceType(): number {
    if (this._Platform.is('android'))
      return 2;
    else if (this._Platform.is('ios'))
      return 3;
    else
      return 1;
  }

  img(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.myphoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  showPass(x) {
    console.log(22222222222222222222)
    switch (x) {
      case 1:
        this.showPwd = false
        console.log("11 " +x)
        break;

      case 0:
        this.showPwd = true
        console.log("22 " +x)

        break;
    }
  }

}