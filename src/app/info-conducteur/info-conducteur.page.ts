import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-info-conducteur',
  templateUrl: './info-conducteur.page.html',
  styleUrls: ['./info-conducteur.page.scss'],
})
export class InfoConducteurPage {

  constructor(private navCtrl: NavController) { }

  continuer() {
    this.navCtrl.navigateForward("/trajet");
  }

}
