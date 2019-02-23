import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoadingController, IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-business',
  templateUrl: './business.page.html',
  styleUrls: ['./business.page.scss'],
})
export class BusinessPage implements OnInit {
  @ViewChild('mySlider') slides: IonSlides;

  constructor(public navCtrl: NavController,
    public _routes: Router) { }
  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
    }
  notiPage() {
    this.navCtrl.navigateForward('notification');
  }

  ngOnInit() {
  }
  goBack() {
    // this.navCtrl.goBack();
  }
  goToHome() {
    this.navCtrl.navigateForward('homeBL');
  }
  goToLife() {
    this.navCtrl.navigateForward('life');
  }
  goToTravel() {
    this.navCtrl.navigateForward('travel');
  }
  goToOffice() {
    this.navCtrl.navigateForward('office');
  }
  goToPA() {
    this.navCtrl.navigateForward('pa');
  }
  goToMotor() {
    this.navCtrl.navigateForward('motor');
  }

}
