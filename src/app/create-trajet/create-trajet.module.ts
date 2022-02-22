import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateTrajetPageRoutingModule } from './create-trajet-routing.module';

import { CreateTrajetPage } from './create-trajet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateTrajetPageRoutingModule
  ],
  declarations: [CreateTrajetPage]
})
export class CreateTrajetPageModule {}
