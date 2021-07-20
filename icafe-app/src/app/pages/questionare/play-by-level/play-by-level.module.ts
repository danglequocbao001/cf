import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayByLevelPageRoutingModule } from './play-by-level-routing.module';

import { PlayByLevelPage } from './play-by-level.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayByLevelPageRoutingModule
  ],
  declarations: [PlayByLevelPage]
})
export class PlayByLevelPageModule {}
