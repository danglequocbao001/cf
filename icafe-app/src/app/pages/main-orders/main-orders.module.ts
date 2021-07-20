import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainOrdersPageRoutingModule } from './main-orders-routing.module';

import { MainOrdersPage } from './main-orders.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainOrdersPageRoutingModule
  ],
  declarations: [MainOrdersPage]
})
export class MainOrdersPageModule {}
