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
  accessToken: string = 'RXJOSXlwNjU4aDZzbVFlZ1FKUkMySEcydDBZRDJkTzhoam1EOGlwdXRjOD06Mi8xMS8yMDE5OjYzNjg1NDkzNjk1MTI0NTUyOQ==';
  objHome = {  
      Data:{
    DateCreatedApartmentOrVilla: "2019-02-10",
    DetailedLocation: "Fares",
    Email: "fares@yahoo.com",
    FkCreatedByUserId: 302,
    FkTransactionId: 0,
    Fk_SomeInsured: 4,
    FullName: "Fares",
    HowManyFloors: 0,
    Images: [],
    IsApartment: true,
    IsOccuied: true,
    IsRented: true,
    NationalID: 81,
    NumberOFRooms: 1,
    NumberOfFloorsIfVilla: 5,
    SizeOfApartmentOrVilla: 545,
    Telephone: "fares",
    WhichFloorIfApartment: 4,
    },
    Language: "en",
    LoggedInUserID: 302,
    };

  constructor(public _GlobalService: GlobalService, public navCtrl: NavController) {
    this._GlobalService.getStorage('Lang').then((val) => {
      this.lang = val;
    });
    this._GlobalService.getStorage('UserInfo').then((val) => {
      this.userID = val.UserId;
    });
  }

  ngOnInit() {}

  InsertHome() {
   // this.objHome.Data.NationalID = this.objHome.Data.NationalID > 0 ? this.objHome.Data.NationalID : null;
    //this.objHome.Language = this.lang;
    //this.objHome.LoggedInUserID=this.userID;
    //this.objHome.Data.FkCreatedByUserId = this.userID;
    console.log(this.objHome);
    this.postInsertNewHome().then(res => {
      console.log(res);
      if (res.Success === 'true') {
        console.log(true);
        this._GlobalService.showAlert('added successfully...', res.ErrorMessage, ['OK']);
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
