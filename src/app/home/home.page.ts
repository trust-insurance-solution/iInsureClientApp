import { Component } from '@angular/core';
import { AccountsService } from '../businessClasses/accounts.service';
import { LoadingController } from '@ionic/angular';
import { analyzeAndValidateNgModules } from '@angular/compiler';



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
  constructor(public _AccountsService: AccountsService, public loadingController: LoadingController) { }

  data = '{ "Data": { "EmailAddress": "", "PhoneNumber": "0785946301", "Password": "123456789", "DeviceToken": "000" }, "Language": "en", }';


  async getData() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });

    await loading.present();

    this._AccountsService.PostData('CreateNewClientAccount', this.data)
      .subscribe(res => {
        this.getSignUp = res;
        loading.dismiss();
      },
        err => {
          console.log(err); 
          loading.dismiss();
        });
  }

  ngOnInit() {

  }

  SaveData() {
    this.getData();
  }

}
