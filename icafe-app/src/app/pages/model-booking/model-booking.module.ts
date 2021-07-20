import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModelBookingPageRoutingModule } from './model-booking-routing.module';

import { ModelBookingPage } from './model-booking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModelBookingPageRoutingModule
  ],
  declarations: [ModelBookingPage]
})
export class ModelBookingPageModule {}
