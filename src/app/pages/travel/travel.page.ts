import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.page.html',
  styleUrls: ['./travel.page.scss'],
})
export class TravelPage implements OnInit {
  @ViewChild('mySlider') slides: IonSlides;

  constructor() { }

  ngOnInit() {
  }
  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
   
  }
}
