import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss','../../home/home.page.scss'],
  //D:\Projects\iInsureClientApp\src\theme\common.scss
})
export class LoginPage implements OnInit {

  constructor( public navCtrl: NavController,) { }

  ngOnInit() {
  }

  SignUp(){
  this.navCtrl.navigateForward('signup')
  }
  lostPss(){
   this.navCtrl.navigateForward('lost-pass')
  }
}
