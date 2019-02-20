import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-termsconditions',
  templateUrl: './termsconditions.page.html',
  styleUrls: ['./termsconditions.page.scss'],
})
export class TermsconditionsPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  Next() {
    this.navCtrl.navigateForward('policyview');
  }

  Previous() {
    this.navCtrl.pop();
  }
}
