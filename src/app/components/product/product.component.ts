import { Component, OnInit, Input } from '@angular/core';
import { Toast } from 'ionic-angular';
import { ToastController } from '@ionic/angular';
import { $ } from 'protractor';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input('product') product: any;

  constructor(private toastCtrl: ToastController) { }

  ngOnInit() {
  }

  async buyItem(product) {
    let toast = await this.toastCtrl.create({
      message: 'added to cart : ${product.name}'
    })
    toast.present();
  }

}

