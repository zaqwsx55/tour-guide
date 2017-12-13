import { Component, OnInit } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-new-place',
  templateUrl: 'new-place.html',
})
export class NewPlacePage implements OnInit {

  newPlaceForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.newPlaceForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  onSubmit() {
    
  }

}
