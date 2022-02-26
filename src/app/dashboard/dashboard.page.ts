// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.page.html',
//   styleUrls: ['./dashboard.page.scss'],
// })
// export class DashboardPage implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { IonicAuthService } from '../ionic-auth.service';
import {AngularFirestore} from "@angular/fire/compat/firestore"

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage implements OnInit {
  userDetail: string;
  nom: string;
    dataUser = {
    email: '',
    nom:'',
    prenom:'',
    statut: ''
 };

  constructor(
    private router: Router,
    private ionicAuthService: IonicAuthService,
    public firestore: AngularFirestore
  ) { }

  ngOnInit() {
    
    this.ionicAuthService.userDetails().subscribe(response => {
      if (response !== null) {
        this.userDetail = response.email;
      } else {
        this.router.navigateByUrl('');
      }
    }, error => {
      console.log(error);
    })
  }

  signOut() {
    this.ionicAuthService.signoutUser()
      .then(res => {
        this.router.navigateByUrl('login');
      })
      .catch(error => {
        console.log(error);
      })
  }
}