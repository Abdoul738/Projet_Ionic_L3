import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateTrajetPage } from './create-trajet.page';

const routes: Routes = [
  {
    path: '',
    component: CreateTrajetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateTrajetPageRoutingModule {}
