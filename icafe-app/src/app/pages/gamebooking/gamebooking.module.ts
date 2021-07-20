import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GamebookingPageRoutingModule } from './gamebooking-routing.module';

import { GamebookingPage } from './gamebooking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GamebookingPageRoutingModule
  ],
  declarations: [GamebookingPage]
})
export class GamebookingPageModule {}
