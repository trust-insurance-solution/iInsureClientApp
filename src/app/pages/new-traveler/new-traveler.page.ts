import { Component, OnInit } from '@angular/core';

import { FormsModule, Validators, FormControl, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { IonicSelectableModule, IonicSelectableComponent } from 'ionic-selectable';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-new-traveler',
  templateUrl: './new-traveler.page.html',
  styleUrls: ['./new-traveler.page.scss'],
})
export class NewTravelerPage implements OnInit {
  formgroup: FormGroup
  FullName: AbstractControl
  DateOfBirth: AbstractControl
  NationalID: AbstractControl
  PassportNumber: AbstractControl
  passExBirth:AbstractControl
  
  constructor(public formbuilder: FormBuilder, public navCtrl: NavController) {

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
    })

    this.FullName = this.formgroup.controls['FullName']
    this.DateOfBirth = this.formgroup.controls['DateOfBirth']
    this.NationalID = this.formgroup.controls['NationalID']
    this.PassportNumber = this.formgroup.controls['PassportNumber']
    this.passExBirth = this.formgroup.controls['passExBirth']

  }

  ngOnInit() {
  }




}
