import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../apiCaller/global.service';
import { NavController, ModalController } from '@ionic/angular';
import { HomeResponse } from '../../../entity/HomeEntity';
import { FormsModule, Validators, FormControl, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { IonicSelectableModule, IonicSelectableComponent } from 'ionic-selectable';
import { CoverageModalPage } from '../coverage-modal/coverage-modal.page';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})



export class HomePage implements OnInit {
  myphoto: any

  apartment: boolean = true

  formgroup: FormGroup
  FullName: AbstractControl
  NationalID: AbstractControl
  vCoverage: AbstractControl
  IsApart: AbstractControl
  size: AbstractControl
  DetailedLoc: AbstractControl
  floor: AbstractControl
  floorAp: AbstractControl
  IsRent: AbstractControl
  Building: AbstractControl
  EmailAddress: AbstractControl
  PhoneNumber: AbstractControl
  room: AbstractControl
  mail: "/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/"



  countries: any;
  country: number = -1;
  lang: string;
  userID: number;
  accessToken: string;
  responseData: HomeResponse[];
  objHome = {
    Data: {
      DateCreatedApartmentOrVilla: "",
      DetailedLocation: "",
      Email: "",
      FkCreatedByUserId: 0,
      FkTransactionId: 0,
      Fk_SomeInsured: 0,
      FullName: "",
      HowManyFloors: 0,
      Images: [],
      IsApartment: true,
      IsOccuied: true,
      IsRented: true,
      NationalID: 0,
      NumberOFRooms: 0,
      NumberOfFloorsIfVilla: 0,
      SizeOfApartmentOrVilla: 0,
      Telephone: "",
      WhichFloorIfApartment: 0,
    },
    Language: "",
    LoggedInUserID: 0,
  };

  constructor(public _GlobalService: GlobalService, public navCtrl: NavController, public formbuilder: FormBuilder, public modalCtrl: ModalController, private camera: Camera) {

    //FORM
    this.formgroup = formbuilder.group({
      FullName: new FormControl('', Validators.compose([
        Validators.maxLength(8),
        Validators.pattern('[a-zA-Z ]*'),
        Validators.required])),

      NationalID: new FormControl('', Validators.compose([
        Validators.required])),

      vCoverage: new FormControl('', Validators.compose([
        Validators.required])),

      IsApart: new FormControl('', Validators.compose([
        Validators.required])),

      IsRent: new FormControl('', Validators.compose([
        Validators.required])),
      size: new FormControl('', Validators.compose([
        Validators.pattern('[0-9 ]*'),
        Validators.required])),

      DetailedLoc: new FormControl('', Validators.compose([
        Validators.pattern('[a-zA-Z0-9 ]*'),
        Validators.required])),

      floor: new FormControl('', Validators.compose([
        Validators.pattern('[0-9 ]*'),
        Validators.required])),
      floorAp: new FormControl('', Validators.compose([
        Validators.pattern('[0-9 ]*'),
        Validators.required])),

      Building: new FormControl('', Validators.compose([
        Validators.required])),

      EmailAddress: new FormControl('', Validators.compose([
        Validators.maxLength(30),
        Validators.pattern(this.mail),
        Validators.required])),

      PhoneNumber: new FormControl('', Validators.compose([
        Validators.maxLength(15),
        Validators.pattern('[0-9]*'),
        Validators.required])),

      room: new FormControl('', Validators.compose([
        Validators.maxLength(15),
        Validators.pattern('[0-9]*'),
        Validators.required])),
    });
    this.FullName = this.formgroup.controls['FullName']
    this.NationalID = this.formgroup.controls['NationalID']
    this.vCoverage = this.formgroup.controls['vCoverage']
    this.IsApart = this.formgroup.controls['IsApart']
    this.size = this.formgroup.controls['size']
    this.DetailedLoc = this.formgroup.controls['DetailedLoc']
    this.floor = this.formgroup.controls['floor']
    this.IsRent = this.formgroup.controls['IsRent']
    this.Building = this.formgroup.controls['Building']
    this.EmailAddress = this.formgroup.controls['EmailAddress']
    this.PhoneNumber = this.formgroup.controls['PhoneNumber']
    this.room = this.formgroup.controls['room']
    this.floorAp = this.formgroup.controls['floorAp']


    this._GlobalService.getStorage('Lang').then((val) => {
      this.lang = val;
    });
    this._GlobalService.getStorage('UserInfo').then((val) => {
      this.userID = val.UserId;
    });
    this.accessToken = "ZWw5TWVsdmhNdk5TOWlxbEMxeW1JOUI4endCMTVLNEpEaFhTV1ZMUmNaOD06Mi8xNy8yMDE5OjYzNjg2MDA4MTgyNzEwNjk5NQ==";
  }

  async  ngOnInit() {
    await this.getCountries().then(result => this.countries = result.Data);
   }

  //Modal
  async coverageModal() {
    const modal = await this.modalCtrl.create({
      component: CoverageModalPage, cssClass: "coverageModal"
    })
    console.log("fe")
    await modal.present();
  }

  //Event for selectable Nationality
  Nationality(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('nationlID:', event.value);
  }


  InsertHome() {
    this.objHome.Data.NationalID = this.objHome.Data.NationalID > 0 ? this.objHome.Data.NationalID : null;
    this.objHome.Language = this.lang;
    this.objHome.LoggedInUserID = this.userID;
    this.objHome.Data.FkCreatedByUserId = this.userID;
    this.postInsertNewHome().then(res => {
      if (res.Success === 'true')
        this.responseData = res.Data.CompanyListResult as HomeResponse[];
      else if (res.ErrorCode === "NotAutharized")
        this._GlobalService.showAlert('Not Autharized...', res.ErrorMessage, ['OK']);
      else
        this._GlobalService.showAlert('', res.ErrorMessage, ['OK']);
    }
    );
  }
  private postInsertNewHome(): Promise<any> {
    return this._GlobalService.fetchDataApi('InsertNewHomeEntry', this.objHome, this.accessToken, this.userID.toString());
  }
  map() {
    this.navCtrl.navigateForward('map');
  }

  img() {
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

    //Get a countries
    getCountries(): Promise<any> {
      return this._GlobalService.fetchDataApi('GetAllCountryList', {});
  
    }

  type(x) {
    console.log("teem" + x)
    switch (x) {
      case 1:
        this.apartment = true
        break;

      case 2:
        this.apartment = false
        break;
    }
  }
}
