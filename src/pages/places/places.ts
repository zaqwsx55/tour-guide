import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Place } from '../../models/place';
import { PlacesService } from '../../services/places.service';

@IonicPage()
@Component({
  selector: 'page-places',
  templateUrl: 'places.html',
})
export class PlacesPage {

  places: Place[] = [];

  constructor(private navCtrl: NavController, 
              private navParams: NavParams,
              private placesService: PlacesService) {
    console.log('data: ' + this.navParams.get('data1'));
  }

  ionViewWillEnter() {
    this.places = this.placesService.getPlaces();
  }

}
