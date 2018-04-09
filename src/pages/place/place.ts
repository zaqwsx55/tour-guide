import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { PlacesProvider } from './../../providers/places/places';
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
  imgLoaded: boolean = false;

  constructor(private viewCtrl: ViewController,
              private navParams: NavParams, 
              private placesProvider: PlacesProvider,
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
    this.placesProvider.getPlace(this.placeId).subscribe((place) => {
      this.place = place;
      this.loading.dismiss();
    });
  }

  onDismiss() {
    this.viewCtrl.dismiss();
  }

  imageLoaded() {
    this.imgLoaded = true;
  }

}
