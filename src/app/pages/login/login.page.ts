import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  //D:\Projects\iInsureClientApp\src\theme\common.scss
})
export class LoginPage implements OnInit {

  constructor( public navCtrl: NavController,) { }

  ngOnInit() {
  }

  SignUp(){
  this.navCtrl.navigateForward('signup')
  }
  forgotPss(){
   this.navCtrl.navigateForward('forgot-pass')
  }
}
