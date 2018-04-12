import { Component, Input, Renderer2, ElementRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import {} from '@types/googlemaps';
import { MAP_STYLES } from './map.styles';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'google-map',
  templateUrl: 'google-map.html'
})
export class GoogleMapComponent {

  @Input('apiKey') apiKey: string;
  public map: any;
  public position: any = null;
  public posSubscription: Observable<Geoposition>;
  public positionSet = false;
  public latLng: {
    lat: number,
    lng: number
  };
  public startMarker: any;
  public markers: any[] = [];
  private mapsLoaded: boolean = false;
  public distance: string;
 
  constructor(private renderer: Renderer2,
              private element: ElementRef,
              private geolocation: Geolocation, 
              @Inject(DOCUMENT) private _document) {}

  ngOnInit() {
    this.init().then((res) => {
      console.log('Google Maps ready');
      // this.watchPosition();
    }, (err) => {
      console.log(err);
    });
  }

  private init(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.injectSDK().then((res) => {
        this.initMap().then((res) => {
          resolve(true);
        }, (err) => {
          reject(err);
        });
      }, (err) => {
        reject(err);
      });
    });
  }

  private injectSDK(): Promise<any> {
    return new Promise((resolve, reject) => {
      window['mapInit'] = () => {
        this.mapsLoaded = true;
        resolve(true);
      }
      let script = this.renderer.createElement('script');
      script.id = 'googleMaps';
      if (this.apiKey) {
        script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey + '&libraries=geometry&callback=mapInit';
      } else {
        script.src = 'https://maps.googleapis.com/maps/api/js?libraries=geometry&callback=mapInit';
      }
      this.renderer.appendChild(this._document.body, script);
    });
  }

  private initMap(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.latLng = {
        lat: 50.06,
        lng: 19.93
      }
      let mapOptions = {
        center: this.latLng,
        zoom: 10,
        disableDefaultUI: true
      }
      this.map = new google.maps.Map(this.element.nativeElement, mapOptions);
      this.startMarker = new google.maps.Marker({
        map: this.map,
        position: this.latLng
      });
      resolve(true);
    });
  }

  public watchPosition() {
    this.posSubscription = this.geolocation.watchPosition();
    return this.posSubscription;
  }

  public addMarker(lat: number, lng: number): void {
    let latLng = new google.maps.LatLng(lat, lng);
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });
    this.markers.push(marker);
  }

  public calcDistance(point1, point2) {
    let p1 = new google.maps.LatLng(point1.lat, point1.lng);
    let p2 = new google.maps.LatLng(point2.lat, point2.lng);
    this.distance = google.maps.geometry.spherical.computeDistanceBetween(p1, p2).toFixed(2);
    return this.distance;
  }

  public navigate(from, to) {
    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay.setMap(this.map);
    let request = {
      origin: from,
      destination: to,
      travelMode: google.maps.TravelMode.WALKING
    };
    directionsService.route(request, function(result, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(result);
      } else {
        console.log('Directions request failed due to ' + status);
      }
    });
  }  

}
