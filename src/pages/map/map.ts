import { Component, ViewChild } from '@angular/core';
import { IonicPage, LoadingController, Loading } from 'ionic-angular';
import { GoogleMapComponent } from './../../components/google-map/google-map';

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild(GoogleMapComponent) mapComponent: GoogleMapComponent;
  loading: Loading;

  marta = {
    lat: 50.052473,
    lng: 19.935146
  }

  constructor(private loadingCtrl: LoadingController) {}

  ionViewDidLoad() {
    this.loading = this.loadingCtrl.create({
      content: 'Lokalizacja...'
    });
    this.loading.present();
    this.watchPosition();
  }

  private watchPosition() {
    this.mapComponent.watchPosition().subscribe((position) => {
      console.log(position);
      this.mapComponent.position = position;
      this.mapComponent.latLng.lat = position.coords.latitude;
      this.mapComponent.latLng.lng = position.coords.longitude;
      this.mapComponent.map.setCenter(this.mapComponent.latLng);
      this.mapComponent.map.setZoom(18);
      this.mapComponent.startMarker.setPosition(this.mapComponent.latLng);
      this.loading.dismiss();
      console.log(this.mapComponent.calcDistance(this.mapComponent.latLng, this.marta));
      this.mapComponent.navigate(this.mapComponent.latLng, this.marta);
    })
  }
  
  testMarker() {
    let center = this.mapComponent.map.getCenter();
    this.mapComponent.addMarker(center.lat(), center.lng());
    console.log(this.mapComponent.calcDistance(this.mapComponent.position, this.marta));
  }

}
