export interface Place {
    
    name: string;
    desc: string;
    lat: number;
    lng: number;
    photo: string;

}

export interface PlaceId extends Place {

    id: string;

}
