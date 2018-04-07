import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'HomePage';
  pages: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.pages = [
      {title: 'Home Page', component: 'HomePage', icon: 'home'},
      {title: 'Miejsca', component: 'PlacesPage', icon: 'pin'},
      {title: 'Trasy', component: 'RoutesPage', icon: 'navigate'},
      {title: 'Mapa', component: 'MapPage', icon: 'map'}
    ];
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

}
