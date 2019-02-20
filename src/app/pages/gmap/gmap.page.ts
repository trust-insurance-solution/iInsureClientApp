import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IonicPage, NavController, ViewController, ModalController, NavParams } from 'ionic-angular';

declare var google;

@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.page.html',
  styleUrls: ['./gmap.page.scss'],
})
export class GmapPage implements OnInit {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  data: any
  data_lat: any
  res: any
  disable = false
  constructor(
    private geolocation: Geolocation,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public navCtrl: NavController,
  ) {
    








  }

   ngOnInit() {
  }


}
