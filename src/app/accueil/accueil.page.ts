import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AngularFirestore} from "@angular/fire/compat/firestore"
import { Trajet } from '../trajet';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage implements OnInit {
  lsttrajet: any[];
  private trajets : Observable<Trajet[]>
  constructor(public firestore: AngularFirestore,private fbService: FirebaseService) {
  //   this.firestore.collection('trajet').valueChanges().subscribe(responses => {
  //     this.lsttrajet = responses;
  // });
   }

  ngOnInit(): void {
    this.trajets = this.fbService.getTrajets();
  }

}
