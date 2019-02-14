import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { IonicSelectableModule } from 'ionic-selectable';
import { ReactiveFormsModule } from '@angular/forms';
import { PaPage } from './pa.page';

const routes: Routes = [
  {
    path: '',
    component: PaPage
  } 
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicSelectableModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PaPage]
})
export class PaPageModule {}
