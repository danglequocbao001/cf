import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingComboPage } from './booking-combo.page';

const routes: Routes = [
  {
    path: '',
    component: BookingComboPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingComboPageRoutingModule {}
