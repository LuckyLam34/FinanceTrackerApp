import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as moment from 'moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
  }

  calendar = {
    mode: 'month',
    currentDate: new Date()
  }

  markDisabled = (date: Date) => {
    var current = new Date();
    return moment(date) < moment(current).subtract(1, 'days');
  };

  onCurrentDateChanged = (ev: Date) => {
    console.log(ev);
  };

}
