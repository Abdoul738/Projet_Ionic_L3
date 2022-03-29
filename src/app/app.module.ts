import { LoginPageModule } from './login/login.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

export const firebaseConfig = {
  // apiKey: "AIzaSyAeAhrbjI2GT3QFFXqdtM9b42SRje4E01A",
  // authDomain: "covoiturage-projet.firebaseapp.com",
  // projectId: "covoiturage-projet",
  // storageBucket: "covoiturage-projet.appspot.com",
  // messagingSenderId: "1056920938286",
  // appId: "1:1056920938286:web:a01cbd4e61a8187ef2fcbf",
  // measurementId: "G-QTD5PPD3SQ"

  apiKey: "AIzaSyCUfWGGSyxn8TisXD9bo8YPwqYet0nDb7s",
  authDomain: "l3miage-8e93e.firebaseapp.com",
  databaseURL: "https://l3miage-8e93e-default-rtdb.firebaseio.com",
  projectId: "l3miage-8e93e",
  storageBucket: "l3miage-8e93e.appspot.com",
  messagingSenderId: "684641835459",
  appId: "1:684641835459:web:e9854ba6ee669a8f460576"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
