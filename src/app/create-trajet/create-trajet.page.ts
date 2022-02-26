import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';
import {AngularFirestore} from "@angular/fire/compat/firestore"
import { Router } from '@angular/router';
import { IonicAuthService } from '../ionic-auth.service';

@Component({
  selector: 'app-create-trajet',
  templateUrl: './create-trajet.page.html',
  styleUrls: ['./create-trajet.page.scss'],
})
export class CreateTrajetPage implements OnInit {
  villeDepart: string;
  villeArrivee: string;
  dateDepart: Date;
  heureDepart: Date;
  nombreDePlaces: number;
  prix: number;
  trajet: any[];
  lsttrajet: any[];
  username : string;
  userfirstname :string;
  conductemail :string;

  constructor(private ionicAuthService: IonicAuthService,private router: Router,public firestore: AngularFirestore, public alertController: AlertController,public afAuth: AngularFireAuth) { 
    
    this.firestore.collection('trajet').snapshotChanges(['added'])
      .subscribe(trajets => {
        trajets.forEach(trajets => {
          if((trajets.payload.doc.data()['condemail'] === this.conductemail)){
            this.firestore.collection('trajet').valueChanges().subscribe(responses => {
              this.lsttrajet = responses;
          });
          }  
        });
    });
  }

    ngOnInit() {
    
    this.ionicAuthService.userDetails().subscribe(response => {
      if (response !== null) {
        this.conductemail = response.email;
        this.firestore.collection('utilisateur').snapshotChanges(['added'])
      .subscribe(actions => {
        actions.forEach(action => {
          if((action.payload.doc.data()['email'] === response.email)){
            this.username = action.payload.doc.data()['nom'];
            this.userfirstname = action.payload.doc.data()['prenom'];
          }  
        });
    });
      } else {
        this.router.navigateByUrl('');
      }
    }, error => {
      console.log(error);
    })
  }
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
    this.firestore.collection('trajet').add({
      villeDepart: this.villeDepart,
      villeArrivee: this.villeArrivee,
      dateDepart: this.dateDepart,
      heureDepart: this.heureDepart,
      prix: this.prix,
      nombreDePlaces: this.nombreDePlaces,
      condemail: this.conductemail,
     });
    //  this.router.navigate(['/home']);
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

}
