import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-business',
  templateUrl: './business.page.html',
  styleUrls: ['./business.page.scss'],
})
export class BusinessPage implements OnInit {


  constructor(public navCtrl: NavController) { }

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
  goToPersonalAccidents() {
    this.navCtrl.navigateForward('pa');
  }
  goToMotor() {
    this.navCtrl.navigateForward('motor');
  }

}
