import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoConducteurPage } from './info-conducteur.page';

const routes: Routes = [
  {
    path: '',
    component: InfoConducteurPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoConducteurPageRoutingModule {}
