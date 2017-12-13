import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PlacesPage } from '../places/places';
import { NewPlacePage } from '../new-place/new-place';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  data: string;

  constructor(public navCtrl: NavController) {}

  onLoadPlaces() {
    this.navCtrl.push(PlacesPage, {
      data1: this.data
    });
  }

  onLoadNewPlace() {
    this.navCtrl.push(NewPlacePage);
  }

}
