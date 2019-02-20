import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from '../../apiCaller/global.service';
import { PersonalAccidentsResponse } from '../../../entity/PersonalAccidentsEntry';
import { FormsModule, Validators, FormControl, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { IonicSelectableModule, IonicSelectableComponent } from 'ionic-selectable';

import { LoadingController, IonSlides } from '@ionic/angular';

import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pa',
  templateUrl: './pa.page.html',
  styleUrls: ['./pa.page.scss'],
})
export class PaPage implements OnInit {
  @ViewChild('mySlider') slides: IonSlides;

  formgroup: FormGroup
  FullName: AbstractControl
  DateOfAcc: AbstractControl
  vCoverage: AbstractControl
  NationalID: AbstractControl
  pCover: AbstractControl
  cases: AbstractControl
  NumberOfUnit: AbstractControl
  CountryResidence: AbstractControl



  countries: any;
  country: number = -1;
  accessToken: string;
  lang: string;
  userID: number;
  objPersonalAccident = {
    Data: {
      FullName: "",
      FkTotalamountofinsuredmaximum: 0,
      DateOfBirth: "",
      AnyChronicCasesOrPerExistingCases: "",
      FkPeriodofcover: 0,
      FkCountryresidence: 0,
      FkNationality: 0,
      FkCreatedByUserId: 0,
      NumberOfUnit: 0
    },
    Token: "",
    Language: "",
    LoggedInUserID: ""
  };
  responseData: PersonalAccidentsResponse[];

  constructor(public _GlobalService: GlobalService, public formbuilder: FormBuilder,private navCtrl:NavController ) {

    this.formgroup = formbuilder.group({
      FullName: new FormControl('', Validators.compose([
        Validators.maxLength(8),
        Validators.pattern('[a-zA-Z ]*'),
        Validators.required])),

      NationalID: new FormControl('', Validators.compose([
        Validators.required])),

      DateOfAcc: new FormControl('', Validators.compose([
        Validators.pattern('[0-9]*'),
        Validators.required])),

      vCoverage: new FormControl('', Validators.compose([
        Validators.required])),

      cases: new FormControl('', Validators.compose([
        Validators.pattern('[a-zA-Z0-9 ]*'),
        Validators.required])),

      pCover: new FormControl('', Validators.compose([
        Validators.required])),

      NumberOfUnit: new FormControl('', Validators.compose([
        Validators.required])),

      CountryResidence: new FormControl('', Validators.compose([
        Validators.required])),

    });

    this.FullName = this.formgroup.controls['FullName']
    this.DateOfAcc = this.formgroup.controls['DateOfAcc']
    this.vCoverage = this.formgroup.controls['vCoverage']
    this.cases = this.formgroup.controls['cases']
    this.pCover = this.formgroup.controls['pCover']
    this.NumberOfUnit = this.formgroup.controls['NumberOfUnit']
    this.NationalID = this.formgroup.controls['NationalID']
    this.CountryResidence = this.formgroup.controls['CountryResidence']

    this._GlobalService.getStorage('Lang').then((val) => {
      this.lang = val;
    });
    this._GlobalService.getStorage('UserInfo').then((val) => {
      this.userID = val.UserId;
    });
    this.accessToken = "RWlTV2tKYitKc0R4TXZCcVBGd0JuelVDN3hBbHNOWjZpcTFOU2VJRkROST06Mi8xOS8yMDE5OjYzNjg2MTY2NjIwNDI5NTcyOA==";
  }

  async  ngOnInit() {
    await this.getCountries().then(result => this.countries = result.Data);
  }

  //Event for selectable Nationality
  Nationality(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    this.objPersonalAccident.Data.FkNationality = event.value.Id;
  }
  //Event for selectable CountryResidenc
  CountryResidenc(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    this.objPersonalAccident.Data.FkCountryresidence = event.value.Id;
  }
  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }
  InsertPersonalAccident() {
    this.objPersonalAccident.Data.FkCreatedByUserId = this.userID;
    this.objPersonalAccident.LoggedInUserID = this.userID.toString();
    this.objPersonalAccident.Language = this.lang;
    this.postOfficeEntry().then((res) => {
      if (res.Success === 'true'){
        this.responseData = res.Data.CompanyListResult as PersonalAccidentsResponse[];
        this._GlobalService._Param =  this.responseData ;
        this.navCtrl.navigateForward('quotation');
      }
      else if (res.ErrorCode === "NotAutharized")
        this._GlobalService.showAlert('Not Autharized...', res.ErrorMessage, ['OK']);
      else
        this._GlobalService.showAlert('', res.ErrorMessage, ['OK']);
    });
  }
  //Get a countries
  getCountries(): Promise<any> {
    return this._GlobalService.fetchDataApi('GetAllCountryList', {});
  }
  private postOfficeEntry(): Promise<any> {
    return this._GlobalService.fetchDataApi('InsertNewPersonalAccidentsEntry', this.objPersonalAccident, this.accessToken, this.userID.toString());
  }
  Counter(i: number) {
    return new Array(i);
  }
}
