import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../apiCaller/global.service';
import { LifeResponse } from '../../../entity/LifeEntity';

@Component({
  selector: 'app-life',
  templateUrl: './life.page.html',
  styleUrls: ['./life.page.scss'],
})
export class LifePage implements OnInit {
  accessToken: string;
  lang: string;
  userID: number;
  responseData: LifeResponse[];

  objLife = {
    Data: {
      ID: 0,
      FullName: "",
      FkTotalamountofinsured: 0,
      DateOfBirth: "",
      AnyChronicCasesOrPerExistingCases: "",
      FkPeriodofcover: 0,
      FkCreatedByUserId: 0,
      FkTransactionId: 0,
      NumberOfUnit: 0
    },
    Language: "",
    LoggedInUserID: 0,
  };

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

  InsertLife() {
    this.objLife.Data.FkCreatedByUserId = this.userID;
    this.objLife.LoggedInUserID = this.userID;
    this.objLife.Language = this.lang;
    this.postLifeEntry().then((res) => {
      if (res.Success === 'true')
        this.responseData = res.Data.CompanyListResult as LifeResponse[];
      else if (res.ErrorCode === "NotAutharized")
        this._GlobalService.showAlert('Not Autharized...', res.ErrorMessage, ['OK']);
      else
        this._GlobalService.showAlert('', res.ErrorMessage, ['OK']);
    });
  }

  private postLifeEntry(): Promise<any> {
    return this._GlobalService.fetchDataApi('InsertNewLifeEntry', this.objLife, this.accessToken, this.userID.toString());
  }

}



