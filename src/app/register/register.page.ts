import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AlertController } from '@ionic/angular';
import {AngularFirestore} from "@angular/fire/compat/firestore"
// import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  nom:string;
  prenom:string;
  email:string;
  password:string;
  statut:string;
  utilisateur:any[];

  constructor(private router: Router,public firestore: AngularFirestore, public alertController: AlertController,public afAuth: AngularFireAuth) { }
  async signup() {
    const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Confirmation',
    message: '<strong>Confirmer la cration de votre compte</strong>',
    buttons: [
    {
    text: 'Annuler',
    role: 'cancel',
    cssClass: 'secondary',
    handler: () => {
    console.log('Annulation');
    }
    }, {
    text: 'OK',
    handler: () => {
    console.log('Confirmation');
    this.firestore.collection('utilisateur').add({
      nom: this.nom,
      prenom: this.prenom,
      email: this.email,
      password: this.password,
      statut: this.statut
     });
     this.router.navigate(['/home']);
    //  this.nom ='';
    //  this.prenom ='';
    //  this.email ='';
    //  this.password ='';
    //  this.statut ='';
    }
    
    }
    ]
  });
  this.afAuth.createUserWithEmailAndPassword(this.email, this.password);
    await alert.present();

  }

  ngOnInit() {
  }

}
