import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// import { Geolocation } from '@ionic-native/geolocation';
import { IonicPage, NavController, ViewController, ModalController, NavParams } from 'ionic-angular';
declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  data: any
  data_lat: any
  res: any
  disable = false

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
   ) {

  
  }
  ngOnInit() {
  }

  }
