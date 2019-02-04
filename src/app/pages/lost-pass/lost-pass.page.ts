import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-lost-pass',
  templateUrl: './lost-pass.page.html', 
  styleUrls: ['./lost-pass.page.scss'],
})
export class LostPassPage implements OnInit {

  constructor(public navCtrl: NavController,) { }

  ngOnInit() {
  }
  restPass(){
    this.navCtrl.navigateForward('rest-pass')
  }
}
