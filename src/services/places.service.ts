import { Storage } from '@ionic/storage';

import { Place } from '../models/place';

export class PlacesService {

    private places: Place[] = [];

    addPlace(place: Place) {
        this.places.push(place);
    }

    getPlaces() {
        return this.places;
    }

}
