import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';

import { Route } from './../../models/route';

@Injectable()
export class RoutesProvider {

  routesCol: AngularFirestoreCollection<Route>;
  routes: Observable<Route[]>;
  routeDoc: AngularFirestoreDocument<Route>;
  route: Observable<Route>;

  constructor(private afs: AngularFirestore) {
    console.log('Hello RoutesProvider Provider');
  }

  getRoutes() {
    this.routesCol = this.afs.collection('routes');
    this.routes = this.routesCol.valueChanges();
    return this.routes;
  }

  getRoute(routeId) {
    this.routeDoc = this.afs.doc('routes/' + routeId);
    this.route = this.routeDoc.valueChanges();
    return this.route;
  }

}
