import { Component, OnInit } from '@angular/core';
import { FormsModule, Validators, FormControl, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { IonicSelectableModule, IonicSelectableComponent } from 'ionic-selectable';
import { NavController, NavParams } from '@ionic/angular';
import { GlobalService } from '../../apiCaller/global.service'

@Component({
  selector: 'app-new-traveler',
  templateUrl: './new-traveler.page.html',
  styleUrls: ['./new-traveler.page.scss'],
})
export class NewTravelerPage implements OnInit {
  formgroup: FormGroup;
  FullName: AbstractControl;
  DateOfBirth: AbstractControl;
  NationalID: AbstractControl;
  PassportNumber: AbstractControl;
  passExBirth: AbstractControl;
  CountryResidence: AbstractControl;
  CurrentDate = new Date();
  objTraveler = {
    FullName: '',
    DateOfBirth: '',
    Nationality: 0,
    NationalityName: '',
    CountryOfResidence: 0,
    CountryOfResidenceName: '',
    PictureOfPassport: '',
    PassportExpireDate: '',
    PassportNumber: ''
  };
  countries: any;
  constructor(public formbuilder: FormBuilder, public navCtrl: NavController,
    private _GlobalService: GlobalService) {

    //FORM
    this.formgroup = formbuilder.group({
      FullName: new FormControl('', Validators.compose([
        Validators.maxLength(8),
        Validators.pattern('[a-zA-Z ]*'),
        Validators.required])),

      DateOfBirth: new FormControl('', Validators.compose([
        Validators.required])),

      NationalID: new FormControl('', Validators.compose([
        Validators.required])),

      PassportNumber: new FormControl('', Validators.compose([
        Validators.maxLength(8),
        Validators.pattern('[a-zA-Z ]*'),
        Validators.required])),

      passExBirth: new FormControl('', Validators.compose([
        Validators.required])),

      CountryResidence: new FormControl('', Validators.compose([
        Validators.required])),
    })

    this.FullName = this.formgroup.controls['FullName'];
    this.DateOfBirth = this.formgroup.controls['DateOfBirth'];
    this.NationalID = this.formgroup.controls['NationalID'];
    this.PassportNumber = this.formgroup.controls['PassportNumber'];
    this.passExBirth = this.formgroup.controls['passExBirth'];
    this.CountryResidence = this.formgroup.controls['passExBirth'];

  }

  addTraveler(val) {
    if (val.FullName != '' && val.DateOfBirth != '' && val.Nationality > 0
      && val.CountryOfResidence > 0 && val.PassportExpireDate != '' && val.PassportNumber != '') {
      var item = JSON.parse(localStorage.getItem('Traveler')) || [];
      item.push(val);
      localStorage.setItem('Traveler', JSON.stringify(item));
    }
  }

  SaveData() {
    if (this.checkPasswordDate() === false) {
      this._GlobalService.showAlert('Warning..!','Passwort has expired',['OK']);
    }
    this.addTraveler(this.objTraveler);
    this.navCtrl.navigateForward('travel');
    this.formgroup.reset()
  }

  checkPasswordDate(): boolean {
    if ((this.objTraveler.PassportExpireDate) != "") {
      this.getDateTime().then(res => {
        this.CurrentDate = new Date(res.Data);
      });
      var Year = this.CurrentDate.getFullYear() - new Date(this.objTraveler.PassportExpireDate).getFullYear();
      var Month = new Date(this.objTraveler.PassportExpireDate).getMonth() - this.CurrentDate.getMonth();
      var Day = this.CurrentDate.getDate() - new Date(this.objTraveler.PassportExpireDate).getDate();
      if ((Year < 1 || Month <= 6) && Day >= 0)
        return false;
    }
  }
  getDateTime(): Promise<any> {
    return this._GlobalService.fetchDataApi('GetCurrentDateTime', { "Data": 1 });
  }

  getCountries(): Promise<any> {
    return this._GlobalService.fetchDataApi('GetAllCountryList', {});
  }
  async ngOnInit() {
    await this.getCountries().then(result => this.countries = result.Data);
  }

  Nationality(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    this.objTraveler.Nationality = event.value.Id;
    this.objTraveler.NationalityName = event.value.CountryName;
  }

  CountryResidenc(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    this.objTraveler.CountryOfResidence = event.value.Id;
    this.objTraveler.CountryOfResidenceName = event.value.CountryName;
  }
}

