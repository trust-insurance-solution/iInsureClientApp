import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.page.html',
  styleUrls: ['./forgot-pass.page.scss'],
})
export class ForgotPassPage implements OnInit {

  constructor(public navCtrl: NavController,) { }

  ngOnInit() {
  }

  restPass(){
    this.navCtrl.navigateForward('rest-pass')
  }
}
