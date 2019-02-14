import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OfficePage } from './office.page';

import { ReactiveFormsModule } from '@angular/forms';
import { IonicSelectableModule } from 'ionic-selectable';

const routes: Routes = [
  {
    path: '',
    component: OfficePage
  }
]; 

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicSelectableModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OfficePage]
})
export class OfficePageModule {}
