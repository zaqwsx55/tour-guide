import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, 
  CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';

@IonicPage()
@Component({
  selector: 'page-place',
  templateUrl: 'place.html',
})
export class PlacePage {

  map: GoogleMap;

  constructor(private viewCtrl: ViewController,
              private googleMaps: GoogleMaps) {}

  ionViewDidLoad() {
    console.log('ion view did load');
    this.loadMap();
  }

  loadMap() {

    console.log('load map');

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = this.googleMaps.create('map', mapOptions);

    // Wait the MAP_READY before using any methods



    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      console.log('Map is ready!');
      // Now you can use all mathods safely
      this.map.addMarker({
        title: 'Ionic',
        icon: 'blue',
        animation: 'DROP',
        position: {
          lat: 43.0741904,
          lng: -89.3809802
        }
      }).then(marker => {
        console.log('then...');
        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
          alert('clicked');
        });
      });
    });

  }

  onDismiss() {
    this.viewCtrl.dismiss();
  }

}
