import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PromotionDetailPageRoutingModule } from './promotion-detail-routing.module';

import { PromotionDetailPage } from './promotion-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PromotionDetailPageRoutingModule
  ],
  declarations: [PromotionDetailPage]
})
export class PromotionDetailPageModule {}
