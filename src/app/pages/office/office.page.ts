import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../apiCaller/global.service'
import { OfficeResponse } from '../../../entity/OfficeEntity';

@Component({
  selector: 'app-office',
  templateUrl: './office.page.html',
  styleUrls: ['./office.page.scss'],
})
export class OfficePage implements OnInit {
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
  constructor(public _GlobalService: GlobalService) {
    this._GlobalService.getStorage('Lang').then((val) => {
      this.lang = val;
    });
    this._GlobalService.getStorage('UserInfo').then((val) => {
      this.userID = val.UserId;
    });
    this.accessToken = "elNRWitrbFpYLzl0UGFnZ3FEUW1RMTNmTWhQTXkvL1FYbGhYNU5tSEtmWT06Mi8xMi8yMDE5OjYzNjg1NTY3NTE1ODI4MzI4Nw==";
  }
  ngOnInit() { }
  InsertOffice() {

    this.objOffice.Data.FkCreatedByUserId = this.userID;
    this.objOffice.LoggedInUserID = this.userID;
    this.objOffice.Language = this.lang;
    this.postOfficeEntry().then((res) => {
      if (res.Success === 'true') {
        this.responseData = res.Data.CompanyListResult as OfficeResponse[];
        console.log(this.responseData);
      }
      else if (res.ErrorCode === "NotAutharized") {
        this._GlobalService.showAlert('Not Autharized...', res.ErrorMessage, ['OK']);
        console.log("NotAutharized");
      }
      else {
        console.log("false");
        this._GlobalService.showAlert('', res.ErrorMessage, ['OK']);
      }
    });
  }
  private postOfficeEntry(): Promise<any> {
    return this._GlobalService.fetchDataApi('InsertNewOfficeEntry', this.objOffice, this.accessToken, this.userID.toString());
  }
}
