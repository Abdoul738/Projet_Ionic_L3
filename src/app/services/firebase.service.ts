import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';
import {AngularFirestore,AngularFirestoreDocument,AngularFirestoreCollection} from "@angular/fire/compat/firestore"
import { Router } from '@angular/router';
import { IonicAuthService } from '../ionic-auth.service';
import { Observable } from 'rxjs';
import { Trajet } from '../trajet';
import { map, take} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private trajets: Observable<Trajet[]>;
  private trajetCollection: AngularFirestoreCollection<Trajet>;

  constructor(private firestore: AngularFirestore) { 
    // definition de la collection
    this.trajetCollection = this.firestore.collection<Trajet>('trajet');
    // obtention des donnees de la collection
    this.trajets = this.trajetCollection.snapshotChanges().pipe(
      map(actions =>{
        return actions.map(a =>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return{id, ...data};
        });
      })
    );
  }

  getTrajets(): Observable<Trajet[]>{
    return this.trajets;
  }
}
