import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../apiCaller/global.service';
import { NavController } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  lang: string;
  userID: number;
  accessToken: string = 'N1lVV0E2Yk5XM0dmS3ZuZGZLTUhvU0pWaXlDbzF3UE9Mbm40bTdmRm93ST06Mi8xMi8yMDE5OjYzNjg1NTU5NjI5ODI1MDEwMQ==';
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
  }

  ngOnInit() { }

  InsertHome() {
    this.objHome.Data.NationalID = this.objHome.Data.NationalID > 0 ? this.objHome.Data.NationalID : null;
    this.objHome.Language = this.lang;
    this.objHome.LoggedInUserID = this.userID;
    this.objHome.Data.FkCreatedByUserId = this.userID;
    this.postInsertNewHome().then(res => {
      if (res.Success === 'true') {
        this.navCtrl.navigateForward('GoToNutationsNotCreated');
      }
      else {
        this._GlobalService.showAlert('Failed...', res.ErrorMessage, ['OK']);
      }
    }
    );
  }
  public postInsertNewHome(): Promise<any> {
    return this._GlobalService.fetchDataApi('InsertNewHomeEntry', this.objHome, this.accessToken, this.userID.toString());
  }
}
