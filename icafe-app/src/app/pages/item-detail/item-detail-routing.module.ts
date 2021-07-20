import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemDetailPage } from './item-detail.page';
import { PaymentPage } from '../payment/payment.page';

const routes: Routes = [
  {
    path: '',
    component: ItemDetailPage
  },
  {
    path: 'payment',
    component: PaymentPage
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemDetailPageRoutingModule {}
