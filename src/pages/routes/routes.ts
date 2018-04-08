import { Component } from '@angular/core';
import { IonicPage, LoadingController, Loading } from 'ionic-angular';
import { RoutesProvider } from './../../providers/routes/routes';
import { Route } from './../../models/route';

@IonicPage()
@Component({
  selector: 'page-routes',
  templateUrl: 'routes.html',
})
export class RoutesPage {

  loading: Loading;
  routes: Route[];
  descSliced = true;

  constructor(private loadingCtrl: LoadingController,
              private routesProvider: RoutesProvider) {}

  ionViewDidLoad() {
    this.loading = this.loadingCtrl.create({
      content: 'Ładowanie...'
    });
    this.loading.present();
  }

  ionViewWillEnter() {
    this.routesProvider.getRoutes().subscribe((routes) => {
      this.routes = routes;
      this.loading.dismiss();
    })
  }

  readMore() {
    this.descSliced = false;
  }

}
