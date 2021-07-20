import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuffetbookingPageRoutingModule } from './buffetbooking-routing.module';

import { BuffetbookingPage } from './buffetbooking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuffetbookingPageRoutingModule
  ],
  declarations: [BuffetbookingPage]
})
export class BuffetbookingPageModule {}
