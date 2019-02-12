import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../apiCaller/global.service';
import { PersonalAccidentsResponse } from '../../../entity/PersonalAccidentsEntry';

@Component({
  selector: 'app-pa',
  templateUrl: './pa.page.html',
  styleUrls: ['./pa.page.scss'],
})
export class PaPage implements OnInit {
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

  constructor(public _GlobalService: GlobalService) {
    this._GlobalService.getStorage('Lang').then((val) => {
      this.lang = val;
    });
    this._GlobalService.getStorage('UserInfo').then((val) => {
      this.userID = val.UserId;
    });
    this.accessToken = "elNRWitrbFpYLzl0UGFnZ3FEUW1RMTNmTWhQTXkvL1FYbGhYNU5tSEtmWT06Mi8xMi8yMDE5OjYzNjg1NTY3NTE1ODI4MzI4Nw==";
  }

  ngOnInit() {
  }

  InsertPersonalAccident() {
    this.objPersonalAccident.Data.FkCreatedByUserId = this.userID;
    this.objPersonalAccident.LoggedInUserID = this.userID.toString();
    this.objPersonalAccident.Language = this.lang;

    this.postOfficeEntry().then((res) => {
      if (res.Success === 'true')
        this.responseData = res.Data.CompanyListResult as PersonalAccidentsResponse[];
      else if (res.ErrorCode === "NotAutharized")
        this._GlobalService.showAlert('Not Autharized...', res.ErrorMessage, ['OK']);
      else
        this._GlobalService.showAlert('', res.ErrorMessage, ['OK']);
    });
  }

  private postOfficeEntry(): Promise<any> {
    return this._GlobalService.fetchDataApi('InsertNewPersonalAccidentsEntry', this.objPersonalAccident, this.accessToken, this.userID.toString());
  }
}
