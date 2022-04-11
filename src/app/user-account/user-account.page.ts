import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';
import {AngularFirestore} from "@angular/fire/compat/firestore"
import { Router } from '@angular/router';
import { IonicAuthService } from '../ionic-auth.service';
import { Observable } from 'rxjs';
import { Trajet } from '../trajet';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.page.html',
  styleUrls: ['./user-account.page.scss'],
})
export class UserAccountPage implements OnInit {
  villeDepart: string;
  villeArrivee: string;
  dateDepart: Date;
  heureDepart: Date;
  nombreDePlaces: number;
  prix: number;
  trajet = {} as Trajet;
  lsttrajet: Observable< any[] >;
  username : string;
  userfirstname :string;
  conductemail :string;
  useremail:string;
  NoTrajet : number;
  TrajetCollectionName = 'trajet';
  UseretCollectionName = 'utilisateur';
  TrajetCountCollectionName = 'tajetcompteur';

  constructor(private fbService: FirebaseService,private ionicAuthService: IonicAuthService,private router: Router,public firestore: AngularFirestore, public alertController: AlertController,public afAuth: AngularFireAuth) { 
    //Verification de l'email
    this.ionicAuthService.userDetails().subscribe(response => {
      if (response !== null) {
        this.conductemail = response.email;
        this.firestore.collection(this.UseretCollectionName).snapshotChanges(['added'])
      .subscribe(actions => {
        actions.forEach(action => {
          if((action.payload.doc.data()['email'] === response.email)){
            this.username = action.payload.doc.data()['nom'];
            this.userfirstname = action.payload.doc.data()['prenom'];
          }  
        });
    });
    // recuperation des donnes 
    this.lsttrajet = this.fbService.getTrajet(response.email);

      } else {
        this.router.navigateByUrl('');
      }
    }, error => {
      console.log(error);
    })
    
    this.firestore.collection(this.TrajetCountCollectionName).snapshotChanges(['added'])
      .subscribe(actions => {
        actions.forEach(action => {
          this.NoTrajet = action.payload.doc.data()['NoTrajet'];
          console.log(this.NoTrajet);
        });
    });

    //end constructor
  }

  async getTrajets(userEmail: string){
    try{
      this.firestore.collection('trajet', ref =>ref.where('condemail','==',userEmail)).valueChanges().subscribe(data=>{
        this.trajet.conductemail = data['condemail'];
        this.trajet.dateDepart = data['dateDepart'];
        this.trajet.heureDepart = data['heureDepart'];
        this.trajet.nombreDePlaces = data['nombreDePlaces'];
        this.trajet.prix = data['prix'];
        this.trajet.villeArrivee = data['villeArrivee'];
        this.trajet.villeDepart = data['villeDepart'];
        this.trajet.id = data['id'];
      })
    }catch (e){

    }
  }

    ngOnInit() {}

  async onCreateClick() {
    const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Confirmation',
    message: '<strong>Confirmer la cration de ce trajet</strong>',
    buttons: [
    {
    text: 'Annuler',
    role: 'cancel',
    cssClass: 'secondary',
    handler: () => {
    console.log('Annulation');
    }
    }, {
    text: 'Confirmer',
    handler: () => {
    console.log('Confirmation');
    this.firestore.collection(this.TrajetCountCollectionName).get ({
      
     });

    this.firestore.collection(this.TrajetCollectionName).add({
      Id: this.NoTrajet+1,
      villeDepart: this.villeDepart,
      villeArrivee: this.villeArrivee,
      dateDepart: this.dateDepart,
      heureDepart: this.heureDepart,
      prix: this.prix,
      nombreDePlaces: this.nombreDePlaces,
      condemail: this.conductemail,
     });
    //  this.router.navigate(['/home']); TrajetCountCollectionName
      this.villeDepart = '';
  this.villeArrivee = '';
  // this.dateDepart = new Date;
  // this.heureDepart = new time;
  this.prix = 0;
  this.nombreDePlaces = 0
   
    }
    
    }
    ]
  });
  await alert.present();

  }
  async deleteTrajet(id: string) {
    await this.firestore.doc('trajet/' + id).delete();
  }

}
