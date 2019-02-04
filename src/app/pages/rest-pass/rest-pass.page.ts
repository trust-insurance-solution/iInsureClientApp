import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-rest-pass',
  templateUrl: './rest-pass.page.html',
  styleUrls: ['./rest-pass.page.scss'],
})
export class RestPassPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }
  home(){
    this.navCtrl.navigateRoot('home')

  }
}
