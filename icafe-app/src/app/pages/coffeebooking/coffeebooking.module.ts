import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoffeebookingPageRoutingModule } from './coffeebooking-routing.module';

import { CoffeebookingPage } from './coffeebooking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoffeebookingPageRoutingModule
  ],
  declarations: [CoffeebookingPage]
})
export class CoffeebookingPageModule {}
