import { Component } from '@angular/core';
import { AccountsService } from '../businessClasses/accounts.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  getSignUp: any;
  objSignUp = {
    EmailAddress: '',
    Password: '',
    DeviceToken: '',
  };
  constructor(public _AccountBusiness: AccountsService, public loadingController: LoadingController, public _routes: Router) { }

  data = '{ "Data": { "EmailAddress": "", "PhoneNumber": "0785946301", "Password": "123456789", "DeviceToken": "000" }, "Language": "en", }';


  async getData() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });

    await loading.present();

    this._AccountBusiness.PostData('CreateNewClientAccount', this.data)
        .subscribe(res => {
          this.getSignUp = res;
          console.log(res);
          loading.dismiss();
        },
        err => {
          console.log(err);
          loading.dismiss();
        });
  }

  ngOnInit() {

  } 
  resultMessage: any;
 
  login() { 
    this._routes.navigateByUrl('login');

  }
  SaveData() {
    this.getData();
  }
}
