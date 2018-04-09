import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Place } from './../../models/place';

@Injectable()
export class PlacesProvider {

  placesCol: AngularFirestoreCollection<Place>;
  places: Observable<Place[]>;
  placeDoc: AngularFirestoreDocument<Place>;
  place: Observable<Place>;

  constructor(private afs: AngularFirestore) {}

  getPlaces() {
    this.placesCol = this.afs.collection('places');
    this.places = this.placesCol.valueChanges();
    return this.places;
  }

  getPlace(placeId) {
    this.placeDoc = this.afs.doc('places/' + placeId);
    this.place = this.placeDoc.valueChanges();
    return this.place;
  }

}
