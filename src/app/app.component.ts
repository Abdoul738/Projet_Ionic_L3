import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Platform } from '@ionic/angular'; 
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { IonicAuthService } from './ionic-auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  navigate : any;
  login = false;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar   : StatusBar,
    private ionicAuthService: IonicAuthService,
    private router: Router
  ) {
    this.initializeApp();
    this.sideMenu();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.ionicAuthService.userDetails().subscribe(response => {
        if (response) {
          this.login = true;
          // this.router.navigateByUrl('');
        } else {
          this.login = false;
          // this.router.navigateByUrl('/login');
        }
      });
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
        title : "Inscription",
        url   : "/register",
        icon  : "person-add-outline"
      },
    ]
  }
  signOut() {
    this.ionicAuthService.signoutUser()
      .then(res => {
        this.router.navigateByUrl('/login');
      })
      .catch(error => {
        console.log(error);
      })
  }
}