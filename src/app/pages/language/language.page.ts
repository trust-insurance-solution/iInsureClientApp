import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-language',
  templateUrl: './language.page.html',
  styleUrls: ['./language.page.scss'],
})
export class LanguagePage implements OnInit {

  lan1: boolean = true
  lan2: boolean = true
  lan3: boolean = true
 


  language_selected = 0
  constructor(private storage: Storage, public alertController: AlertController, public navCtrl: NavController) { }

  ngOnInit() {
  }

  lang(x) {
    console.log(2222)
    switch (x) {
      case 1:
        if (this.lan1) {
          this.language_selected = x;
          console.log("xx11 " + x)
          console.log("d11 " + this.language_selected)
          this.lan1 = false
          this.lan2 = true
          this.lan3 = true
         
        }
        else {
          //  this.lan1 = true
          console.log("fasleee")
        }
        break;
      case 2:
        if (this.lan2) {
          this.language_selected = x;
          console.log("xx22 " + x)
          console.log("d22 " + this.language_selected)
          this.lan2 = false
          this.lan1 = true
          this.lan3 = true
        }
        else {
          // this.lan2 = true
        }
        break;

      case 3:
        if (this.lan3) {
          this.language_selected = x;
          console.log("xx11 " + x)
          console.log("d22 " + this.language_selected)
          this.lan3 = false
          this.lan1 = true
          this.lan2 = true
        }
        else {
          // this.lan3 = true
        }
        break;
    }
  }



  done() {
    if (this.language_selected == 1) {
      this.storage.set('Lang', 'en');
      console.log("dede1" + this.language_selected)
      this.navCtrl.navigateForward('signup')

    }
    else if (this.language_selected == 2) {
      this.storage.set('Lang', 'ar');
      console.log("dede222 " + this.language_selected)
      this.navCtrl.navigateForward('signup')

    }
    else if (this.language_selected == 3) {
      this.storage.set('Lang', 'fr');
      console.log("dede3333  " + this.language_selected)
      this.navCtrl.navigateForward('signup')

    }
    else {
      alert("Selecte a language first")
    }


  }
}
