import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../apiCaller/global.service'
import { OfficeResponse } from '../../../entity/OfficeEntity';
import { FormsModule, Validators, FormControl, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { IonicSelectableModule, IonicSelectableComponent } from 'ionic-selectable';
import { NavController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-office',
  templateUrl: './office.page.html',
  styleUrls: ['./office.page.scss'],
})
export class OfficePage implements OnInit {
  apartment: boolean = true
  myphoto: any
  countries: any;
  CurrentDate = new Date();
  formgroup: FormGroup
  FullName: AbstractControl
  National: AbstractControl
  vCoverage: AbstractControl
  IsApart: AbstractControl
  size: AbstractControl
  DetailedLoc: AbstractControl
  floor: AbstractControl
  IsRent: AbstractControl
  Building: AbstractControl
  EmailAddress: AbstractControl
  PhoneNumber: AbstractControl
  room: AbstractControl
  IsOccuied: AbstractControl
  imge: AbstractControl
  rName: AbstractControl
  Occupancy: AbstractControl
  IsAvailability: AbstractControl
  NumberOfEmployee: AbstractControl
  mail: "/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/"

  lang: string;
  userID: number;
  accessToken: string;
  objOffice = {
    Data: {
      FullName: "",
      NationalID: 0,
      Fk_SomeInsured: 0,
      SizeOfOfficeOrVilla: 0,
      DetailedLocation: "",
      IsApartment: true,
      NumberOfFloorsIfVilla: 0,
      WhichFloorIfApartment: 0,
      HowManyFloors: 0,
      DateApartmentOrVillaBuilt: "",
      FkCreatedByUserId: 0,
      NumberOFRooms: 0,
      IsRented: true,
      IsOccuied: true,
      Email: "",
      Telephone: "",
      CompanyRegistrationNumber: "",
      Occupancy: "",
      IsAvailability: true,
      NumberOfEmployees: 0,
      Images: []
    },
    Language: "",
    LoggedInUserID: 0
  };
  responseData: OfficeResponse[];
  constructor(public _GlobalService: GlobalService, public formbuilder: FormBuilder, public navCtrl: NavController, private camera: Camera) {

    //FORM
    this.formgroup = formbuilder.group({
      FullName: new FormControl('', Validators.compose([
        Validators.maxLength(8),
        Validators.pattern('[a-zA-Z ]*'),
        Validators.required])),

      National: new FormControl('', Validators.compose([
        Validators.required])),

      vCoverage: new FormControl('', Validators.compose([
        Validators.required])),

      IsApart: new FormControl('', Validators.compose([
        Validators.required])),

      IsRent: new FormControl('', Validators.compose([
        Validators.required])),

      IsOccuied: new FormControl('', Validators.compose([
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

      NumberOfEmployee: new FormControl('', Validators.compose([
        Validators.pattern('[0-9 ]*'),
        Validators.required])),
      Building: new FormControl('', Validators.compose([
        Validators.required])),

      imge: new FormControl('', Validators.compose([
        Validators.required])),

      IsAvailability: new FormControl('', Validators.compose([
        Validators.required])),

      EmailAddress: new FormControl('', Validators.compose([
        Validators.maxLength(30),
        Validators.pattern(this.mail),
        Validators.required])),

      PhoneNumber: new FormControl('', Validators.compose([
        Validators.maxLength(15),
        Validators.pattern('[0-9]*'),
        Validators.required])),

      rName: new FormControl('', Validators.compose([
        Validators.pattern('[0-9]*'),
        Validators.required])),


      Occupancy: new FormControl('', Validators.compose([
        Validators.pattern('[a-zA-Z0-9]*'),
        Validators.required])),

      room: new FormControl('', Validators.compose([
        Validators.maxLength(15),
        Validators.pattern('[0-9]*'),
        Validators.required])),

    });
    this.FullName = this.formgroup.controls['FullName']
    this.National = this.formgroup.controls['National']
    this.vCoverage = this.formgroup.controls['vCoverage']
    this.IsApart = this.formgroup.controls['IsApart']
    this.IsOccuied = this.formgroup.controls['IsOccuied']
    this.size = this.formgroup.controls['size']
    this.DetailedLoc = this.formgroup.controls['DetailedLoc']
    this.floor = this.formgroup.controls['floor']
    this.IsRent = this.formgroup.controls['IsRent']
    this.Building = this.formgroup.controls['Building']
    this.EmailAddress = this.formgroup.controls['EmailAddress']
    this.PhoneNumber = this.formgroup.controls['PhoneNumber']
    this.room = this.formgroup.controls['room']
    this.imge = this.formgroup.controls['imge']
    this.rName = this.formgroup.controls['rName']
    this.Occupancy = this.formgroup.controls['Occupancy']
    this.IsAvailability = this.formgroup.controls['IsAvailability']
    this.NumberOfEmployee = this.formgroup.controls['NumberOfEmployee']


    this._GlobalService.getStorage('Lang').then((val) => {
      this.lang = val;
    });
    this._GlobalService.getStorage('UserInfo').then((val) => {
      this.userID = val.UserId;
    });
    this.accessToken = "WWZlbTJyY29iazlkL09zMVlnM1VYVEk3UEZOek53NjRpZ1M3ZEw1ZFgxTT06Mi8xOC8yMDE5OjYzNjg2MDc4NDEzNDExMTMxMg==";
  }
  async ngOnInit() {
    await this.getCountries().then(result => this.countries = result.Data);
  }

  InsertOffice() {
    this.objOffice.Data.FkCreatedByUserId = this.userID;
    this.objOffice.LoggedInUserID = this.userID;
    this.objOffice.Language = this.lang;
    if (this.CheckDateOfBuilding() === 1) {
      this.postOfficeEntry().then((res) => {
        if (res.Success === 'true'){
          this.responseData = res.Data.CompanyListResult as OfficeResponse[];
          this._GlobalService._Param =  this.responseData ;
          this.navCtrl.navigateForward('quotation');
        }
        else if (res.ErrorCode === "NotAutharized")
          this._GlobalService.showAlert('Not Autharized...', res.ErrorMessage, ['OK']);
        else
          this._GlobalService.showAlert('', res.ErrorMessage, ['OK']);
      });
    }
    else if (this.CheckDateOfBuilding() === 0) {
      this._GlobalService.showAlert("Note", " Constructions with more than 30 years of age are rejected. ", ['OK']);
    }
  }

  private postOfficeEntry(): Promise<any> {
    return this._GlobalService.fetchDataApi('InsertNewOfficeEntry', this.objOffice, this.accessToken, this.userID.toString());
  }

  getCountries(): Promise<any> {
    return this._GlobalService.fetchDataApi('GetAllCountryList', {});
  }
  getDateTime(): Promise<any> {
    return this._GlobalService.fetchDataApi('GetCurrentDateTime', { "Data": 1 });
  }
  //Check Date of Building
  CheckDateOfBuilding(): number {
    if ((this.objOffice.Data.DateApartmentOrVillaBuilt) != "") {
      this.getDateTime().then(res => {
        this.CurrentDate = new Date(res.Data);
      });
      var comp = this.CurrentDate.getFullYear() - new Date(this.objOffice.Data.DateApartmentOrVillaBuilt).getFullYear();
      if (comp > 30)
        return 0;
      else if (comp <= 30)
        return 1;
    }
  }

  Counter(i: number) {
    return new Array(i);
  }

  //Event for selectable Nationality
  Nationality(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    this.objOffice.Data.NationalID = event.value.Id;
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

  //Show and hide controls
  ShowControls(val) {
    switch (val) {
      case 1:
        this.apartment = true
        break;

      case 2:
        this.apartment = false
        break;
    }
  }
}
