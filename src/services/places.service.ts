import { Injectable } from '@angular/core';

// import { Storage } from '@ionic/storage';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Place } from '../models/place';

@Injectable()
export class PlacesService {

    placesCol: AngularFirestoreCollection<Place>;
    places: any;
    placeDoc: AngularFirestoreDocument<Place>;
    place: Observable<Place>;

    constructor(private afs: AngularFirestore) {}

    // getPlaces() {
    //     this.placesCol = this.afs.collection('places');
    //     this.places = this.placesCol.snapshotChanges()
    //         .map(actions => {
    //             return actions.map(a => {
    //                 const data = a.payload.doc.data() as Place;
    //                 const id = a.payload.doc.id;
    //                 return {id, data};
    //             })
    //         })
    //     return this.places;
    // }


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
    


    // getPlaces() {
    //     return this.storage.get('places').then((places) => {
    //         if (places) {
    //             this.places = places
    //         } else {
    //             this.places = [];
    //         }
    //         return this.places;
    //     })
    // }

    // addPlace(place: Place) {
    //     this.places.push(place);
    //     this.storage.set('places', this.places);
    // }


}
