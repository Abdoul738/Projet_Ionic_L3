import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { IonicAuthService } from '../ionic-auth.service';
import {AngularFirestore} from "@angular/fire/compat/firestore"

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userForm: FormGroup;
  successMsg: string = '';
  errorMsg: string = '';

//   dataUser = {
//     email: '',
//     password: ''
//  };
//  connected: boolean;
error_msg = {
  'email': [
    { 
      type: 'required', 
      message: 'Email requis.' 
    },
    { 
      type: 'pattern', 
      message: 'Email invalide.' 
    }
  ],
  'password': [
    { 
      type: 'required', 
      message: 'Mot de passe requis.' 
    },
    { 
      type: 'minlength', 
      message: 'Le mot de passe doit etre superieur a 6 caracteres.' 
    }
  ]
};

constructor(
  private router: Router,
  private ionicAuthService: IonicAuthService,
  private fb: FormBuilder,
  public firestore: AngularFirestore
) { }

ngOnInit() {
  this.userForm = this.fb.group({
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ])),
    password: new FormControl('', Validators.compose([
      Validators.minLength(6),
      Validators.required
    ])),
  });
}

// signIn(value) {
//   this.ionicAuthService.signinUser(value)
//     .then((response) => {
//       console.log(response)
//       this.errorMsg = "";
//       this.router.navigateByUrl('dashboard');
//     }, error => {
//       this.errorMsg = error.message;
//       this.successMsg = "";
//     })
// }

signIn(value) {
  this.ionicAuthService.signinUser(value)
    .then((response) => {
      console.log(response)
      this.errorMsg = "";
// Verification du statut de l'utilisateur
      this.firestore.collection('utilisateur').snapshotChanges(['added'])
      .subscribe(actions => {
        actions.forEach(action => {
          if((action.payload.doc.data()['email'] = value.email) && (action.payload.doc.data()['statut'] = 'Conducteur')){
            this.router.navigateByUrl('dashboard');
          };
          if((action.payload.doc.data()['email'] = value.email) && (action.payload.doc.data()['statut'] = 'Passager')){
            this.router.navigateByUrl('listuser');
          };
        });
    });

    }, error => {
      this.errorMsg = error.message;
      this.successMsg = "";
    })
}

goToSignup() {
  this.router.navigateByUrl('register');
}

  // constructor(public alertController: AlertController,private router: Router,public toastController: ToastController,public afDB: AngularFireDatabase,public afAuth: AngularFireAuth) {
      // this.afAuth.authState.subscribe(auth => {
      //   if (!auth) {
      //     // this.error();
      //     console.log('non connecté');
      //     this.connected = false;
      //   } else {
      //     console.log('connecté: ' + auth.uid);
      //     this.connected = true;
      //     this.router.navigate(['/listuser']);
      //   }
      // });
  //   }

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

  //    login() {
  //     this.afAuth.signInWithEmailAndPassword(this.dataUser.email, this.dataUser.password);
  //     this.afAuth.authState.subscribe(auth => {
  //       if (!auth) {
  //         // this.error();
  //         console.log('non connecté');
  //         this.connected = false;
  //         this.router.navigate(['/listuser']);
  //       } else {
  //         console.log('connecté: ' + auth.uid);
  //         this.connected = true;
         
  //       }
  //     });
  //      this.dataUser = {
  //        email: '',
  //        password: ''
  //      };
  //   }

  // ngOnInit() {
  // }

}
