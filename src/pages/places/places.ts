import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, Loading } from 'ionic-angular';
import { PlacesProvider } from './../../providers/places/places';
import { Place } from './../../models/place';

@IonicPage()
@Component({
  selector: 'page-places',
  templateUrl: 'places.html',
})
export class PlacesPage {

  //places: Place[] = [];

  places: Place[];
  loading: Loading;

  constructor(private navCtrl: NavController, 
              private navParams: NavParams,
              private placesProvider: PlacesProvider,
              private modalCtrl: ModalController,
              private loadingCtrl: LoadingController) {
    console.log('data: ' + this.navParams.get('data1'));
  }

  // ionViewWillEnter() {
  //   this.placesService.getPlaces().then((places) => {
  //     this.places = places;
  //   });
  // }

  ionViewDidLoad() {
    console.log('ion view did load');
    this.loading = this.loadingCtrl.create({
      content: 'Ładowanie...'
    });
    this.loading.present();
  }

  ionViewWillEnter() {
    console.log('ion view will enter');
    this.placesProvider.getPlaces().subscribe((placesList) => {
      this.places = placesList;
      this.loading.dismiss();
    });
    // this.places = this.placesService.getPlaces();
  }

  onOpenPlace(placeId) {
    console.log('placeId: ' + placeId);
    this.navCtrl.push('PlacePage', { placeId: placeId });
    // this.modalCtrl.create('PlacePage', { placeId: placeId }).present();
  }

  onLoadNewPlace() {
    this.navCtrl.push('NewPlacePage');
  }

}
