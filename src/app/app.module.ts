import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PlacesPage } from '../pages/places/places';
import { NewPlacePage } from '../pages/new-place/new-place';
import { PlacesService } from '../services/places.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PlacesPage,
    NewPlacePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PlacesPage,
    NewPlacePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PlacesService
  ]
})
export class AppModule {}
