import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingComboPageRoutingModule } from './booking-combo-routing.module';

import { BookingComboPage } from './booking-combo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingComboPageRoutingModule
  ],
  declarations: [BookingComboPage]
})
export class BookingComboPageModule {}
