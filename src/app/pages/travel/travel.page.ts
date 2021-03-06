import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';
import { GlobalService } from '../../apiCaller/global.service';
import { TravelResponse } from '../../../entity/TravelEntry';
import { FormsModule, Validators, FormControl, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { IonicSelectableModule, IonicSelectableComponent } from 'ionic-selectable';
import { forEach } from '@angular/router/src/utils/collection';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.page.html',
  styleUrls: ['./travel.page.scss'],
})
export class TravelPage implements OnInit {



  information: any[]
  automaticClose = false



  sub: boolean = false

  formgroup: FormGroup
  StartDateJourney: AbstractControl
  EndDateJourney: AbstractControl
  countr: AbstractControl
  traveler;
  lang;
  userID;
  accessToken;
  countries: any;
  responseData: any;

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

  constructor(public _GlobalService: GlobalService,
    public formbuilder: FormBuilder,
    public navCtrl: NavController,
    private http: HttpClient) {
    //get array from info.json
    this.http.get('assets/information.json').subscribe(res => {
      this.information = res['items'];

      this.information[0].open = true;
    });

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
      this.accessToken = val.AccessToken;
    });
  }



  toggleSection(index) {
    this.information[index].open = !this.information[index].open

    if (this.automaticClose && this.information[index].open) {
      this.information
        .filter((item, itemIndex) => itemIndex != index)
        .map(item => item.open = false)
    }
  }

  toggleItem(index, childIndex) {
    this.information[index].children[childIndex].open = !this.information[index].children[childIndex].open

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
      if (res.Success === 'true') {
        this.responseData = res;
        this._GlobalService._Param = this.responseData;
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


  showhide(index) {
    switch (index) {
      case index:
        console.log(index)
        this.sub =true
        break;
    }
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