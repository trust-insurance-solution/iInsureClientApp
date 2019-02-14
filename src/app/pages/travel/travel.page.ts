import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
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

  constructor(public _GlobalService: GlobalService, public formbuilder: FormBuilder, ) {

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
    this.accessToken = "eDd1ZHQxNnZoQXdzVTdSa1pTZHJFWjljMlJIa1BHYTBZSWl1R0M2RHJnQT06Mi8xMy8yMDE5OjYzNjg1NjUxOTQ1NTkyNzMyMg==";
  }

  async ngOnInit() {
    await this.getCountries().then(result => this.countries = result.Data);
  }

  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }

  savePost() {
    this.objTravel.Data.fkCreatedByUserId = this.userID;
    this.objTravel.LoggedInUserID = this.userID;
    this.objTravel.Language = this.lang;
    console.log(this.objTravel);
    this.postTravelEntry().then((res) => {
      if (res.Success === 'true')
        this.responseData = res.Data.CompanyListResult as TravelResponse[];
      else if (res.ErrorCode === "NotAutharized")
        this._GlobalService.showAlert('Not Autharized...', res.ErrorMessage, ['OK']);
      else
        this._GlobalService.showAlert('Failed...', res.ErrorMessage, ['OK']);
    });
  }

  addTraveler() { }

  private postTravelEntry(): Promise<any> {
    return this._GlobalService.fetchDataApi('InsertNewTravelEntry', this.objTravel, this.accessToken, this.userID.toString());
  }
  getCountries(): Promise<any> {
    return this._GlobalService.fetchDataApi('GetAllCountryList', {});
  }

  diagnosisChange(event) {
    let Lst: FkDestination[] = [];
    event.value.forEach(function (element) {
      Lst.push({ FkDestinationId: element.Id });
    });
    this.objTravel.Data.destinationIds = Lst;
    //alert("lst "+Lst)
    //alert(this.objTravel.Data.fkCreatedByUserId)
    console.log('eeeeeeeeeee:', event.value);

    console.log('ffffffff:', event.value[0].Id);
    for (let j = 1; j <= this.objTravel.Data.destinationIds.length; j++) {
      console.log("Country " + j)
      // this.objTravel.Data.destinationIds[j].Id
      console.log('id :', event.value[j].Id, event.value[j].CountryName);

      alert('id :' + event.value[j].Id + " - " + event.value[j].CountryName);
    }

  }

}

export interface TravlerEntity {
  FullName: string;
  DateOfBirth: string;
  Nationality: number;
  CountryOfResidence: number;
  PictureOfPassport: string;
  PassportExpireDate: string;
  PassportNumber: string;
}
export interface FkDestination {
  FkDestinationId: number;
}