import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {AngularFirestore} from "@angular/fire/compat/firestore"
import { ActivatedRoute } from '@angular/router';

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
  conductemail :string;
  NoTrajet : number;
  TrajetCollectionName = 'trajet'

  constructor(public firestore: AngularFirestore, public alertController: AlertController,private activateRoute:ActivatedRoute) { 
    this.conductemail = this.activateRoute.snapshot.paramMap.get('useremail');
    //end constructor
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

}
