import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AngularFirestore} from "@angular/fire/compat/firestore"
import { Trajet } from '../trajet';
import { FirebaseService } from '../services/firebase.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-detail-trajet',
  templateUrl: './detail-trajet.page.html',
  styleUrls: ['./detail-trajet.page.scss'],
})
export class DetailTrajetPage implements OnInit {
  trajet = {} as Trajet;
  id:any;
  constructor(private firestore: AngularFirestore,private activateRoute:ActivatedRoute,private fbService: FirebaseService,private router:Router) {
    this.id = this.activateRoute.snapshot.paramMap.get('id');
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
    }catch (e){
      
    }
  }


}
