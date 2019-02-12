import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../apiCaller/global.service';
import { NavController, ModalController } from '@ionic/angular';
import { HomeResponse } from '../../../entity/HomeEntity';
import { FormsModule, Validators, FormControl, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { IonicSelectableModule, IonicSelectableComponent } from 'ionic-selectable';
import { CoverageModalPage } from '../coverage-modal/coverage-modal.page';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})



export class HomePage implements OnInit {

  apartment: boolean = true

  formgroup: FormGroup
  FullName: AbstractControl
  NationalID: AbstractControl
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

  constructor(public _GlobalService: GlobalService, public navCtrl: NavController, public formbuilder: FormBuilder, public modalCtrl: ModalController) {

    //FORM
    this.formgroup = formbuilder.group({
      FullName: new FormControl('', Validators.compose([
        Validators.maxLength(8),
        Validators.pattern('[a-zA-Z ]*'),
        Validators.required])),

      NationalID: new FormControl('', Validators.compose([
        Validators.required])),

    });
    this.FullName = this.formgroup.controls['FullName']
    this.NationalID = this.formgroup.controls['NationalID']


    this._GlobalService.getStorage('Lang').then((val) => {
      this.lang = val;
    });
    this._GlobalService.getStorage('UserInfo').then((val) => {
      this.userID = val.UserId;
    });
    this.accessToken = "elNRWitrbFpYLzl0UGFnZ3FEUW1RMTNmTWhQTXkvL1FYbGhYNU5tSEtmWT06Mi8xMi8yMDE5OjYzNjg1NTY3NTE1ODI4MzI4Nw==";
  }

  ngOnInit() { }

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
