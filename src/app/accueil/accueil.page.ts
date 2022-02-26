import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AngularFirestore} from "@angular/fire/compat/firestore"

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage implements OnInit {
  lsttrajet: any[];
  constructor(public firestore: AngularFirestore) {
    this.firestore.collection('trajet').valueChanges().subscribe(responses => {
      this.lsttrajet = responses;
  });
   }

  ngOnInit() {
  }

}
