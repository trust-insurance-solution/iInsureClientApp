import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from '../../apiCaller/global.service';
import { LifeResponse } from '../../../entity/LifeEntity';
import { FormsModule, Validators, FormControl, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { LoadingController, IonSlides } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-life',
  templateUrl: './life.page.html',
  styleUrls: ['./life.page.scss'],
})
export class LifePage implements OnInit {
  @ViewChild('mySlider') slides: IonSlides;

  formgroup: FormGroup
  FullName: AbstractControl
  DateOfBirth: AbstractControl
  vCoverage: AbstractControl
  pCover: AbstractControl
  cases: AbstractControl
  NumberOfUnit: AbstractControl

  accessToken: string;
  lang: string;
  userID: number;
  responseData: any;

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

  constructor(public _GlobalService: GlobalService, public formbuilder: FormBuilder,private navCtrl:NavController ) {
    this.formgroup = formbuilder.group({
      FullName: new FormControl('', Validators.compose([
        Validators.maxLength(8),
        Validators.pattern('[a-zA-Z ]*'),
        Validators.required])),

      DateOfBirth: new FormControl('', Validators.compose([
        Validators.pattern('[0-9]*'),
        Validators.required])),

      vCoverage: new FormControl('', Validators.compose([
        Validators.required])),

      cases: new FormControl('', Validators.compose([
        Validators.pattern('[a-zA-Z0-9 ]*'),
        Validators.required])),

      pCover: new FormControl('', Validators.compose([
        Validators.required])),

      NumberOfUnit: new FormControl('', Validators.compose([
        Validators.required])),
    });

    this.FullName = this.formgroup.controls['FullName']
    this.DateOfBirth = this.formgroup.controls['DateOfBirth']
    this.vCoverage = this.formgroup.controls['vCoverage']
    this.cases = this.formgroup.controls['cases']
    this.pCover = this.formgroup.controls['pCover']
    this.NumberOfUnit = this.formgroup.controls['NumberOfUnit']

    this._GlobalService.getStorage('Lang').then((val) => {
      this.lang = val;
    });
    this._GlobalService.getStorage('UserInfo').then((val) => {
      this.userID = val.UserId;
      this.accessToken = val.AccessToken;
    });
  }
  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }

  
  ngOnInit() { }

  InsertLife() {
    this.objLife.Data.FkCreatedByUserId = this.userID;
    this.objLife.LoggedInUserID = this.userID;
    this.objLife.Language = this.lang;
    this.postLifeEntry().then((res) => {
      if (res.Success === 'true'){
        this.responseData = res;
        this._GlobalService._Param =  this.responseData ;
        this.navCtrl.navigateForward('quotation');
      }
      else if (res.ErrorCode === "NotAutharized")
        this._GlobalService.showAlert('Not Autharized...', res.ErrorMessage, ['OK']);
      else
        this._GlobalService.showAlert('', res.ErrorMessage, ['OK']);
    });
  }

  private postLifeEntry(): Promise<any> {
    return this._GlobalService.fetchDataApi('InsertNewLifeEntry', this.objLife, this.accessToken, this.userID.toString());
  }

  Counter(i: number) {
    return new Array(i);
  }
}



