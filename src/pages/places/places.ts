import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, Loading } from 'ionic-angular';

import { PlacesService } from '../../services/places.service';

@IonicPage()
@Component({
  selector: 'page-places',
  templateUrl: 'places.html',
})
export class PlacesPage {

  //places: Place[] = [];

  places: any;
  loading: Loading;

  constructor(private navCtrl: NavController, 
              private navParams: NavParams,
              private placesService: PlacesService,
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
    this.placesService.getPlaces().subscribe((placesList) => {
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
