import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Platform } from '@ionic/angular'; 
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  navigate : any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar   : StatusBar
  ) {
    this.initializeApp();
    this.sideMenu();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  sideMenu()
  {
    this.navigate =
    [
      {
        title : "Accueil",
        url   : "/home",
        icon  : "home"
      },
      {
        title : "Connexion",
        url   : "/login",
        icon  : "person-outline"
      },
      {
        title : "Inscription",
        url   : "/register",
        icon  : "person-add-outline"
      },
      {
        title : "Proposer trajet",
        url   : "/info-conducteur",
        icon  : "../../assets/ico/chemin.jpg"
      },
    
    ]
  }
}