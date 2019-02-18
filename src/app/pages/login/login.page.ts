import { Component, OnInit } from '@angular/core';
import { NavController, AlertController,Platform } from '@ionic/angular';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { GlobalService } from '../../apiCaller/global.service';
import { FormsModule, Validators, FormControl, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  showPwd: boolean
  formgroup: FormGroup
  EmailAddress: AbstractControl
  Password: AbstractControl
  mail: "/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/"






  deviceToken;
  Lang:string;
  loginData = {
    Data:
    {
      EmailAddress: '',
      PhoneNumber: '',
      Password: '',
      DeviceToken: '',
      FkMachineType:1
    },
    Language: ''
  };
  ResponseData: any;
  userInfo: any;


  constructor(public navCtrl: NavController,
    public _GlobalService: GlobalService,
    private uniqueDeviceID: UniqueDeviceID,
    public alertController: AlertController,private _Platform: Platform,
    public formbuilder: FormBuilder) {
      this.formgroup = formbuilder.group({
        EmailAddress: new FormControl('', Validators.compose([
          Validators.maxLength(30),
          Validators.pattern(this.mail),
          Validators.required])),
  
        Password: new FormControl('', Validators.compose([
          Validators.minLength(7),
          Validators.pattern('[a-zA-Z0-9!!#$%&*+\/=?^_`{|}~.-]*'),
          Validators.required])),
        })
        this.EmailAddress = this.formgroup.controls['EmailAddress']
        this.Password = this.formgroup.controls['Password']











      // fares cbF1x6YK4_w:APA91bEZOJLaN5ZO8wfRB6WyyLIQZ_29E0RLlU4ssd7rqEOxAP1AXYCOBE07-jBQyyn6zKY6MUrqXNFIZsS186Pg-fGMeOSwoHq1tJYv53V_BYHEduiT8CehSlxpObifuMOmuDEZZWQb";
      // "ZWw5TWVsdmhNdk5TOWlxbEMxeW1JOUI4endCMTVLNEpEaFhTV1ZMUmNaOD06Mi8xNy8yMDE5OjYzNjg2MDA4MTgyNzEwNjk5NQ==";
    this.deviceToken = !this._GlobalService.getPlatform() ? this._GlobalService.getDeviceToken() : "ZWw5TWVsdmhNdk5TOWlxbEMxeW1JOUI4endCMTVLNEpEaFhTV1ZMUmNaOD06Mi8xNy8yMDE5OjYzNjg2MDA4MTgyNzEwNjk5NQ==";
    this._GlobalService.getStorage('Lang').then((val) => {
      this.Lang = val;
    });
  }

  LoginUser() {
    this.loginData.Data.DeviceToken = this.deviceToken;
    this.loginData.Data.PhoneNumber = this.loginData.Data.EmailAddress;
    this.loginData.Data.FkMachineType=this.getDeviceType();
    this.loginData.Language = this.Lang;

    this.postLogin().then(res => {
      if (res.Success === 'true') {
        console.log(this.loginData);
        this._GlobalService.setStorage('UserInfo', res.Data);
        this.navCtrl.navigateForward('home');
      }
      else {
        this._GlobalService.showAlert('Sign-in Failed', res.ErrorMessage, ['OK']);
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
  postLogin(): Promise<any> {
    return this._GlobalService.fetchDataApi('Login', this.loginData);
  }
  getDeviceType(): number {
    if (this._Platform.is('ios'))
      return 3;
    else if (this._Platform.is('android'))
      return 2;
    else
      return 1;
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


