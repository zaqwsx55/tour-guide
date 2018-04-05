import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation';

import { PlacesService } from '../../services/places.service';

@IonicPage()
@Component({
  selector: 'page-new-place',
  templateUrl: 'new-place.html',
})
export class NewPlacePage implements OnInit {

  newPlaceForm: FormGroup;
  location: any;

  constructor(private formBuilder: FormBuilder,
              private placesService: PlacesService,
              private navController: NavController,
              private geolocation: Geolocation) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.newPlaceForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log('Form submitted');
    console.log(this.newPlaceForm);
    this.placesService.addPlace(this.newPlaceForm.value);
    this.navController.pop();
  }

  onLocateUser() {
    this.geolocation.getCurrentPosition().then((location) => {
      console.log('Location fetched successfully');
      this.location = location;
    }).catch((error) => {
      console.log('An error occurred. ', error);
    })
  }

}
