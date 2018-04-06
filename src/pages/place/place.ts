import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { PlacesService } from './../../services/places.service';
import { Place } from './../../models/place';

@IonicPage()
@Component({
  selector: 'page-place',
  templateUrl: 'place.html',
})
export class PlacePage {

  place: Place;
  placeId: string;
  loading: Loading;

  constructor(private viewCtrl: ViewController,
              private navParams: NavParams, 
              private placesService: PlacesService,
              private loadingCtrl: LoadingController) {
    this.placeId = this.navParams.get('placeId');
    // let placeId = this.navParams.get('placeId');
    // this.place = this.placesService.getPlace(placeId);
  }

  ionViewDidLoad() {
    this.loading = this.loadingCtrl.create({
      content: 'Ładowanie...'
    });
    this.loading.present();
    this.placesService.getPlace(this.placeId).subscribe((place) => {
      this.place = place;
      this.loading.dismiss();
    })
  }

  onDismiss() {
    this.viewCtrl.dismiss();
  }

}
