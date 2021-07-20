import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemDetailPageRoutingModule } from './item-detail-routing.module';

import { ItemDetailPage } from './item-detail.page';
import { ProductsPageModule } from '../products/products.module';
import { PaymentPage } from '../payment/payment.page';
import { PaymentPageModule } from '../payment/payment.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemDetailPageRoutingModule,
    PaymentPageModule
  ],
  declarations: [ItemDetailPage]
})
export class ItemDetailPageModule {}