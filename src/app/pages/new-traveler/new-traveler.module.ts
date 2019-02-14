import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NewTravelerPage } from './new-traveler.page';

import { IonicSelectableModule } from 'ionic-selectable';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    component: NewTravelerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicSelectableModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NewTravelerPage]
})
export class NewTravelerPageModule { }
