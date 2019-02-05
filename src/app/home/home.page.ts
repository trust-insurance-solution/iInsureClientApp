import { Component, ViewChild } from '@angular/core';
import { GlobalService } from '../services/global.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { NavController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  resultMessage: any;
  @ViewChild('mySlider') slides: IonSlides;
  @ViewChild('mySlider2') slides2: IonSlides;

  constructor(public _GlobalService: GlobalService, public navCtrl: NavController, ) {


  }

  SaveData() {
    let data = {
      "FullName": "Faresss1",
      "EmailAddress": "fareselkh865@yahoo.com",
      "PhoneNumber": "42364384",
      "Password": "43243fd",
      "CountryId": 81
    }
    this.resultMessage = this._GlobalService.postService('s', data);
    console.log(data.FullName);
  }

  login() {
    this.navCtrl.navigateForward('login')
  }

  slideOpts = {
    loop: true,
    slidesPerView: 1.5,
    slidesPerGroup: 1,
    spaceBetween: 10
  };

  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }
  slidesDidLoad2(slides2: IonSlides) {
    slides2.startAutoplay();
  }
}
