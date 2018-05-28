import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as moment from 'moment';
import { AngularFireDatabase } from 'angularfire2/database/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  categories;

  constructor(
    public navCtrl: NavController,
    db: AngularFireDatabase) {
    const observer = db.object('categories').valueChanges();
    observer
      .subscribe((categories) => {
        this.categories = Object['values'](categories);
      });
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
