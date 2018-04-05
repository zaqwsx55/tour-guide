import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

import { ToastController } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation
} from '@ionic-native/google-maps';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  data: string;

  mapReady: boolean = false;
  map: GoogleMap;
  location: MyLocation;

  constructor(private navCtrl: NavController, public toastCtrl: ToastController, private geolocation: Geolocation) {}

  loadMapPage(): void {
    this.navCtrl.push('MapPage');
  }

  navigate(): void {

    this.navCtrl.push('NewPage');

  }

  onLoadPlaces() {
    this.navCtrl.push('PlacesPage', {
      data1: this.data
    });
  }

  onLoadNewPlace() {
    this.navCtrl.push('NewPlacePage');
  }


  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    // Create a map after the view is loaded.
    // (platform is already ready in app.component.ts)
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: 43.0741704,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    });

    // Wait the maps plugin is ready until the MAP_READY event
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.mapReady = true;
    });
  }

  onButtonClick() {
    if (!this.mapReady) {
      this.showToast('map is not ready yet. Please try again.');
      return;
    }
    this.map.clear();


    this.map.getMyLocation().then((location: MyLocation) => {
      this.location = location;
      console.log('my location: ' + JSON.stringify(location));
      console.log('lat: ' + location.latLng.lat);
      console.log('lng: ' + location.latLng.lng);


      this.map.animateCamera({
        target: {
          lat: this.location.latLng.lat,
          lng: this.location.latLng.lng
        },
        zoom: 17,
        tilt: 60,
        bearing: 140,
        duration: 5000
      }).then(() => {
        console.log('log...');
      })

    }).catch((error) => {
      console.log('error' + error);
    })



    // this.geolocation.getCurrentPosition().then((location) => {
    //   console.log('Location fetched successfully');
    //   // this.location = location;
    // }).catch((error) => {
    //   console.log('An error occurred. ', error);
    // })





    // // Get the location of you
    // this.map.getMyLocation()
    //   .then((location: MyLocation) => {
    //     console.log('my location: ' + JSON.stringify(location, null ,2));

    //     // Move the map camera to the location with animation
    //     return this.map.animateCamera({
    //       target: location.latLng,
    //       zoom: 17,
    //       tilt: 30
    //     }).then(() => {
    //       // add a marker
    //       return this.map.addMarker({
    //         title: '@ionic-native/google-maps plugin!',
    //         snippet: 'This plugin is awesome!',
    //         position: location.latLng,
    //         animation: GoogleMapsAnimation.BOUNCE
    //       });
    //     })
    //   }).then((marker: Marker) => {
    //     // show the infoWindow
    //     marker.showInfoWindow();

    //     // If clicked it, display the alert
    //     marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
    //       this.showToast('clicked!');
    //     });
    //   });


  }

  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });

    toast.present(toast);
  }


}
