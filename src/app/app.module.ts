import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import {  IonicStorageModule } from '@ionic/storage';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations:
    [AppComponent],
  entryComponents: [],
  imports: [
    HttpClientModule, 
    IonicSelectableModule,
    BrowserModule,
     IonicModule.forRoot(),
      AppRoutingModule,
       IonicStorageModule.forRoot(),
  ],

  providers: [
    StatusBar,
    UniqueDeviceID,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
