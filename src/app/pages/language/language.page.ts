import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController, NavController,Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-language',
  templateUrl: './language.page.html',
  styleUrls: ['./language.page.scss'],
})
export class LanguagePage implements OnInit {
  username:string;
  language:string;
  alertTitle:string;
  lan1: boolean = true
  lan2: boolean = true
  lan3: boolean = true

  language_selected = 0
  constructor(private storage: Storage, public alertController: AlertController, public navCtrl: NavController,private _Platform:Platform,public translate:TranslateService) {
  }
          
  ngOnInit() {
  }
  
  changeLanguage(x) {
    switch (x) {
      case 1:
        this.language_selected = x;
        this.lan1 = false
        this.lan2 = true
        this.lan3 = true
        this.language_selected =1;
        document.documentElement.dir = 'ltr';
        this.translate.use('en');
        break;
      case 2:
        this.lan2 = false
        this.lan1 = true
        this.lan3 = true
        this.language_selected =2;
        document.documentElement.dir = 'rtl';
        this.translate.use('ar');
        break;
      case 3:
        this.lan3 = false
        this.lan1 = true
        this.lan2 = true
        this.language_selected =3;
        document.documentElement.dir = 'ltr';
        this.translate.use('fr');
        break;
    }
  }



  done() {
    if (this.language_selected == 1) {
      this.storage.set('Lang', 'en');
      this.navCtrl.navigateForward('signup')
    }
    else if (this.language_selected == 2) {
      this.storage.set('Lang', 'ar');
      this.navCtrl.navigateForward('signup')
    }
    else if (this.language_selected == 3) {
      this.storage.set('Lang', 'fr');
      this.navCtrl.navigateForward('signup')
    }
    else {
      alert("Selecte a language first")
    }
  }
}
