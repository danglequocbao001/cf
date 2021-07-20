import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModelBookingPage } from './model-booking.page';

const routes: Routes = [
  {
    path: '',
    component: ModelBookingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModelBookingPageRoutingModule {}
