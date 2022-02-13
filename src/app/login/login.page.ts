import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  dataUser = {
    email: '',
    password: ''
 };
 connected: boolean;

  constructor(public alertController: AlertController,private router: Router,public toastController: ToastController,public afDB: AngularFireDatabase,public afAuth: AngularFireAuth) {
      this.afAuth.authState.subscribe(auth => {
        if (!auth) {
          // this.error();
          console.log('non connecté');
          this.connected = false;
        } else {
          console.log('connecté: ' + auth.uid);
          this.connected = true;
          this.router.navigate(['/listuser']);
        }
      });
     }

    //  async error() {
    //   const alert = await this.alertController.create({
    //   cssClass: 'my-custom-class',
    //   header: 'Confirmation',
    //   message: '<strong>Erreur: Adresse mail ou mot de passe incorrect. <p>Veuillez reesayer.</strong>',
    //   buttons: [
    //   {
    //   text: 'OK',
    //   role: 'cancel',
    //   cssClass: 'secondary',
    //   handler: () => {
    //   console.log('Annulation');
    //   }
    //   }, 
    //   ]
    // });

    //   await alert.present();
  
    // }

     login() {
      this.afAuth.signInWithEmailAndPassword(this.dataUser.email, this.dataUser.password);
       this.dataUser = {
         email: '',
         password: ''
       };
    }

  ngOnInit() {
  }

}
