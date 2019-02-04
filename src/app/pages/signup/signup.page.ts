import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  pass: any
  conpass: any
  email: any

  constructor( public navCtrl: NavController) { }

  ngOnInit() {
  }

  login() {
    this.navCtrl.navigateForward('login')
  }

  signup(name, password, conpass, email) {
    this.conpass = conpass
    this.pass = password
    this.email = email

    if (this.pass != this.conpass)
      alert('Password not correct')
    else
      alert('Successfully Registered')

  }
}
