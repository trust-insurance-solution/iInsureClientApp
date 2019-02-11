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

  travelPage(){
    this.navCtrl.navigateForward('travel');

  } 
  goToHome(){
    this.navCtrl.navigateForward('homeBL')
  }

}
