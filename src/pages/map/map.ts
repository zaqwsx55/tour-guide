import { Component, ViewChild } from '@angular/core';
import { IonicPage, LoadingController, Loading } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';

import { MAP_STYLES } from './map.styles';

declare var google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild('map') mapElement;
  map: any;
  position: Geoposition;
  // latLng: google.maps.LatLng = null;
  latLng = {};
  // marker: google.maps.Marker = null;
  marker: any;
  loading: Loading;

  marta = {
    lat: 50.086026,
    lng: 20.022902
  };
  distance: number;

  //public map: google.maps.Map = null;

  constructor(private geolocation: Geolocation, private loadingCtrl: LoadingController) {}

  ionViewDidLoad() {

    this.loading = this.loadingCtrl.create({
      content: 'Lokalizacja...'
    });
    this.loading.present();

    this.latLng = {
      lat: 50.06,
      lng: 19.93
    }

    console.log(this.latLng);

    this.distance = this.calcDistance(this.marta, this.latLng);

    console.log('distance: ' + this.distance);



    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: this.latLng,
      zoom: 10,
      styles: MAP_STYLES,
      disableDefaultUI: true
    });

    this.marker = new google.maps.Marker({
      position: this.latLng,
      map: this.map
    });

    this.geolocation.watchPosition().subscribe((position) => {
      this.position = position;
      this.latLng = {
        lat: this.position.coords.latitude,
        lng: this.position.coords.longitude
      };
      console.log(this.latLng);

      this.distance = this.calcDistance(this.marta, this.latLng);

      this.map.setCenter(this.latLng);
      this.map.setZoom(18);
      this.marker.setPosition(this.latLng);
      // TODO
      // Sprawdzić, czy Loading jest aktywny
      // Jeśli tak, to wyłączyć
      this.loading.dismiss();
    })



    // this.geolocation.getCurrentPosition().then((position) => {
    //   this.position = position;
    //   this.latLng = new google.maps.LatLng(this.position.coords.latitude, this.position.coords.longitude);

    //   let mapOptions = {
    //       center: this.latLng,
    //       zoom: 18,
    //       mapTypeId: google.maps.MapTypeId.ROADMAP,
    //       styles: MAP_STYLES
    //     };

    //     this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    //     this.marker = new google.maps.Marker({
    //       position: this.latLng,
    //       map: this.map
    //     });
      
    //   });

    // this.geolocation.watchPosition().subscribe((position) => {
    //   this.position = position;
    //   this.latLng = new google.maps.LatLng(this.position.coords.latitude, this.position.coords.longitude);

    //   this.map.setCenter(this.latLng);
    // });

    // this.initMap();

  }

  initMap() {

    // let latLng = new google.maps.LatLng(50.0616124, 19.9391191);
    // let latLng = new google.maps.LatLng(this.position.coords.latitude, this.position.coords.longitude);

    // let mapOptions = {
    //   center: latLng,
    //   zoom: 18,
    //   mapTypeId: google.maps.MapTypeId.ROADMAP,
    //   styles: MAP_STYLES
    // };

    // this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    // let marker = new google.maps.Marker({
    //   position: latLng,
    //   map: this.map
    // });

  }

  calcDistance(point1, point2) {
    let p1 = new google.maps.LatLng(point1);
    let p2 = new google.maps.LatLng(point2);
    return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2)).toFixed(2);
  }

}
