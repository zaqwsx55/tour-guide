import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  mapReady: boolean = false;

  constructor(private navCtrl: NavController) {}

  loadMapPage(): void {
    this.navCtrl.push('MapPage');
  }

}
