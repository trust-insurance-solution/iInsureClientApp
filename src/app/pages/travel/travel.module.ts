import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TravelPage } from './travel.page';
import { IonicSelectableModule } from 'ionic-selectable';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicPageModule } from 'ionic-angular';
import { SharedComponentsModule } from 'src/app/components/shared-components/shared-components.module';
import { HttpClient } from '@angular/common/http';

const routes: Routes = [
  {
    path: '', 
    component: TravelPage
  }
];
 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicSelectableModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedComponentsModule

  ],
  declarations: [TravelPage]
})
export class TravelPageModule { }
