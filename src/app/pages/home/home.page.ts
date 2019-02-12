import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../apiCaller/global.service';
import { NavController } from '@ionic/angular';
import { HomeResponse } from '../../../entity/HomeEntity';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
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

  constructor(public _GlobalService: GlobalService, public navCtrl: NavController) {
    this._GlobalService.getStorage('Lang').then((val) => {
      this.lang = val;
    });
    this._GlobalService.getStorage('UserInfo').then((val) => {
      this.userID = val.UserId;
    });
    this.accessToken = "elNRWitrbFpYLzl0UGFnZ3FEUW1RMTNmTWhQTXkvL1FYbGhYNU5tSEtmWT06Mi8xMi8yMDE5OjYzNjg1NTY3NTE1ODI4MzI4Nw==";
  }

  ngOnInit() { }

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
}
