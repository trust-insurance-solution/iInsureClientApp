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
import { IonicStorageModule } from '@ionic/storage';
import { IonicSelectableModule } from 'ionic-selectable';
import { Camera } from '@ionic-native/camera/ngx';
import { HttpModule, Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { File } from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Network } from '@ionic-native/network/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';




export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations:
    [AppComponent],
  entryComponents: [],
  imports: [
    HttpModule,
    FormsModule,
    IonicStorageModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    IonicSelectableModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  exports: [TranslateModule],
  providers: [
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    StatusBar,
    UniqueDeviceID,
    SplashScreen,
    Camera,
    File,
    WebView,
    FilePath,
    Network,
    Geolocation,
    DocumentViewer
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
