import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailComboPageRoutingModule } from './detail-combo-routing.module';

import { DetailComboPage } from './detail-combo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailComboPageRoutingModule
  ],
  declarations: [DetailComboPage]
})
export class DetailComboPageModule {}
