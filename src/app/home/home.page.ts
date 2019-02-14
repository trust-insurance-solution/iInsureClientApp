import { Component, ViewChild } from '@angular/core';
import { LoadingController, IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { GlobalService } from '../apiCaller/global.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  @ViewChild('mySlider') slides: IonSlides;

  fullName: string;
  userImage: string;

  constructor(public navCtrl: NavController, public loadingController: LoadingController, public _routes: Router, public _GlobalService: GlobalService) {
    this._GlobalService.getStorage('UserInfo').then((val) => {
      this.fullName = val.FullName;
      this.userImage = this.userImage != null ? this.userImage : "../../assets/img/avatar.png";
    });
  }


  ngOnInit() { }
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
  businessPage() {
    this.navCtrl.navigateForward('business');
  }
}