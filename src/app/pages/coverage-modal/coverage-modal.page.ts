import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coverage-modal',
  templateUrl: './coverage-modal.page.html',
  styleUrls: ['./coverage-modal.page.scss'],
})
export class CoverageModalPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  public coverage = [
    { value: '50.000', isChecked: false },
    { value: '100.000', isChecked: false },
    { value: '150.000', isChecked: false },
    { value: '200.000', isChecked: false },
    { value: '250.000', isChecked: false },
    { value: '300.000', isChecked: false },
  ];
  done() {
    console.log(this.coverage)
    
   // console.log(this.coverage[("true")])

  }
}
