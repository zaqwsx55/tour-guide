import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { Place } from '../../models/place';
import { PlacesService } from '../../services/places.service';
import { PlacePage } from '../place/place';

@IonicPage()
@Component({
  selector: 'page-places',
  templateUrl: 'places.html',
})
export class PlacesPage {

  places: Place[] = [];

  constructor(private navCtrl: NavController, 
              private navParams: NavParams,
              private placesService: PlacesService,
              private modalCtrl: ModalController) {
    console.log('data: ' + this.navParams.get('data1'));
  }

  ionViewWillEnter() {
    this.placesService.getPlaces().then((places) => {
      this.places = places;
    });
  }

  opOpenPlace() {
    this.modalCtrl.create(PlacePage).present();

  }

}
