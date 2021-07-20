import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LosePageRoutingModule } from './lose-routing.module';

import { LosePage } from './lose.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LosePageRoutingModule
  ],
  declarations: [LosePage]
})
export class LosePageModule {}
