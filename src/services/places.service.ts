import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Place } from '../models/place';

@Injectable()
export class PlacesService {

    private places: Place[] = [];

    constructor(private storage: Storage) {}

    addPlace(place: Place) {
        this.places.push(place);
        this.storage.set('places', this.places);
    }

    getPlaces() {
        return this.storage.get('places').then((places) => {
            if (places) {
                this.places = places
            } else {
                this.places = [];
            }
            return this.places;
        })
    }

}
