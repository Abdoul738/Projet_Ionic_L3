import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailTrajetPageRoutingModule } from './detail-trajet-routing.module';

import { DetailTrajetPage } from './detail-trajet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailTrajetPageRoutingModule
  ],
  declarations: [DetailTrajetPage]
})
export class DetailTrajetPageModule {}
