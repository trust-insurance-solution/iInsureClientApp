import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';
import { GlobalService } from '../../apiCaller/global.service';
import { TravelResponse } from '../../../entity/TravelEntry';
import { FormsModule, Validators, FormControl, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { IonicSelectableModule, IonicSelectableComponent } from 'ionic-selectable';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.page.html',
  styleUrls: ['./travel.page.scss'],
})
export class TravelPage implements OnInit {

  formgroup: FormGroup
  StartDateJourney: AbstractControl
  EndDateJourney: AbstractControl
  countr: AbstractControl
  traveler;
  lang;
  userID;
  accessToken;
  countries: any;
  responseData;

  travlerLst: TravlerEntity[] = [];
  destinationId: FkDestination[] = [];

  objTravel = {
    Data: {
      destinationIds: [],
      endDateJourney: "",
      fkCreatedByUserId: 0,
      listTravelEntry: [],
      startDateJourney: ""
    },
    Language: "",
    LoggedInUserID: 0,
  };
  @ViewChild('mySlider') slides: IonSlides;

  constructor(public _GlobalService: GlobalService, public formbuilder: FormBuilder,
    public navCtrl: NavController) {

    //FORM
    this.formgroup = formbuilder.group({
      StartDateJourney: new FormControl('', Validators.compose([
        Validators.required])),

      EndDateJourney: new FormControl('', Validators.compose([
        Validators.required])),

      countr: new FormControl('', Validators.compose([
        Validators.required])),
    })
    this.StartDateJourney = this.formgroup.controls['StartDateJourney']
    this.EndDateJourney = this.formgroup.controls['EndDateJourney']
    this.countr = this.formgroup.controls['countr']
    this._GlobalService.getStorage('Lang').then((val) => {
      this.lang = val;
    });
    this._GlobalService.getStorage('UserInfo').then((val) => {
      this.userID = val.UserId;
    });
    this.accessToken = "TGtNc2w5VXFPb2xEMzJhWVNvazBaTStMeC9uVFE4N04weUFiY3BzN3Fwaz06Mi8xOS8yMDE5OjYzNjg2MTg5ODgzNDA3ODYxNw==";
  }

  ionViewWillEnter() {
    this.addTraveler();
  }

  addTraveler() {
    this.travlerLst = JSON.parse(localStorage.getItem('Traveler')) || [];
  }

  async ngOnInit() {
    await this.getCountries().then(result => this.countries = result.Data);
  }

  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }

  savePost() {
    this.objTravel.Data.listTravelEntry = JSON.parse(localStorage.getItem('Traveler')) || [];
    this.objTravel.Data.fkCreatedByUserId = this.userID;
    this.objTravel.LoggedInUserID = this.userID;
    this.objTravel.Language = this.lang;
    this.postTravelEntry().then((res) => {
      if (res.Success === 'true'){
        this.responseData = res.Data.CompanyListResult as TravelResponse[];
        this._GlobalService._Param =  this.responseData ;
        this.navCtrl.navigateForward('quotation');
      }
      else if (res.ErrorCode === "NotAutharized")
        this._GlobalService.showAlert('Not Autharized...', res.ErrorMessage, ['OK']);
      else
        this._GlobalService.showAlert('Failed...', res.ErrorMessage, ['OK']);
    });
  }

  newTraveler() {
    this.navCtrl.navigateForward('new-traveler');
  }

  private postTravelEntry(): Promise<any> {
    return this._GlobalService.fetchDataApi('InsertNewTravelEntry', this.objTravel, this.accessToken, this.userID.toString());
  }

  getCountries(): Promise<any> {
    return this._GlobalService.fetchDataApi('GetAllCountryList', {});
  }

  removeItem(index) {
    this.travlerLst = JSON.parse(localStorage.getItem('Traveler')) || [];
    this.travlerLst.splice(index, 1);
    localStorage.setItem('Traveler', JSON.stringify(this.travlerLst));
    this.ionViewWillEnter();
  }

  diagnosisChange(event) {
    let Lst: FkDestination[] = [];
    event.value.forEach(function (element) {
      Lst.push({ FkDestinationId: element.Id });
    });
    this.objTravel.Data.destinationIds = Lst;
  }
}

export interface TravlerEntity {
  FullName: string;
  DateOfBirth: string;
  Nationality: number;
  NationalityName: string;
  CountryOfResidence: number;
  CountryOfResidenceName: string;
  PictureOfPassport: string;
  PassportExpireDate: string;
  PassportNumber: string;
}
export interface FkDestination {
  FkDestinationId: number;
}