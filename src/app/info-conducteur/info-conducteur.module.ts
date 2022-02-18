import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoConducteurPageRoutingModule } from './info-conducteur-routing.module';

import { InfoConducteurPage } from './info-conducteur.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoConducteurPageRoutingModule
  ],
  declarations: [InfoConducteurPage]
})
export class InfoConducteurPageModule {}
