import { Component } from'@angular/core';
import { AccountsService } from'../businessClasses/account/accounts.service';
import { LoadingController } from'@ionic/angular';
import { Router } from'@angular/router';
import { NavController } from'@ionic/angular';
 
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
constructor(public navCtrl: NavController,public _AccountsService: AccountsService, public loadingController: LoadingController, public _routes: Router) { }
 
data ='{ "Data": { "EmailAddress": "", "PhoneNumber": "0785946301", "Password": "123456789", "DeviceToken": "000" }, "Language": "en", }';
   
ngOnInit() {
 
}
resultMessage: any;
login() {
this._routes.navigateByUrl('login');
 
}
SaveData() {
this.navCtrl.navigateForward('signup')
// this.getData();
}
}