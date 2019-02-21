import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';


import { GmapPage } from './gmap.page';

const routes: Routes = [
  {
    path: '',
    component: GmapPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GmapPage]
})
export class GmapPageModule {}
