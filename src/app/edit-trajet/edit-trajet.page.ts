import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AngularFirestore} from "@angular/fire/compat/firestore"
import { Trajet } from '../trajet';
import { FirebaseService } from '../services/firebase.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-edit-trajet',
  templateUrl: './edit-trajet.page.html',
  styleUrls: ['./edit-trajet.page.scss'],
})
export class EditTrajetPage implements OnInit {
  trajet = {} as Trajet;
  id:any;
  private trajetCollection: AngularFirestoreCollection<Trajet>;
  constructor(private firestore: AngularFirestore,private activateRoute:ActivatedRoute,private fbService: FirebaseService,private router:Router) {
    this.id = this.activateRoute.snapshot.paramMap.get('id');
    this.trajetCollection = this.firestore.collection<Trajet>('trajet');
   }

  ngOnInit() {
    this.getTrajet(this.id);
  }

  async getTrajet(id: string){
    this.firestore.doc('trajet/' + id).valueChanges().subscribe(data =>{
      this.trajet.conductemail = data['condemail'];
      this.trajet.dateDepart = data['dateDepart'];
      this.trajet.heureDepart = data['heureDepart'];
      this.trajet.nombreDePlaces = data['nombreDePlaces'];
      this.trajet.prix = data['prix'];
      this.trajet.villeArrivee = data['villeArrivee'];
      this.trajet.villeDepart = data['villeDepart'];
      this.trajet.id = data['id'];
    })
  }

  async updateTrajet(trajet:Trajet){
    try{
      await this.firestore.doc('trajet/' + this.id).update(trajet);
      console.log(this.trajet)
    }catch (e){
      
    }
  }

  async updateTrajets(trajet:Trajet):Promise<void>{
    this.router.navigateByUrl('user-account');
    return this.trajetCollection.doc(this.id).update({
      villeDepart: trajet.villeDepart,
      villeArrivee: trajet.villeArrivee,
      dateDepart: trajet.dateDepart,
      heureDepart: trajet.heureDepart,
      prix: trajet.prix,
      nombreDePlaces: trajet.nombreDePlaces
    });
    
  }



}
