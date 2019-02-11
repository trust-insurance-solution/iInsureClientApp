import { Component, ViewChild } from '@angular/core';
import { LoadingController, IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  @ViewChild('mySlider') slides: IonSlides;



  getSignUp: any;
  objSignUp = {
    EmailAddress: '',
    Password: '',
    DeviceToken: '',
  };
  constructor(public navCtrl: NavController, public loadingController: LoadingController, public _routes: Router) { }

  data = '{ "Data": { "EmailAddress": "", "PhoneNumber": "0785946301", "Password": "123456789", "DeviceToken": "000" }, "Language": "en", }';

  ngOnInit() {

  }
  resultMessage: any;
  login() {
    this._routes.navigateByUrl('login');
  }
  SaveData() {
    this.navCtrl.navigateForward('signup')
    // this.getData();
  }
  notiPage() {
    this._routes.navigateByUrl('notification');
  }
  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
   
  }
  
  previous() {
   this.slides.slidePrev();
  }
  next() {
    this.slides.slideNext();

  }
}