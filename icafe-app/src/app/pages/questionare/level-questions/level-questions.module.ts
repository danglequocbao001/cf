import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LevelQuestionsPageRoutingModule } from './level-questions-routing.module';

import { LevelQuestionsPage } from './level-questions.page';
import { WinPageModule } from '../win/win.module';
import { LosePageModule } from '../lose/lose.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LevelQuestionsPageRoutingModule,
    WinPageModule,
    LosePageModule,
  ],
  declarations: [LevelQuestionsPage]
})
export class LevelQuestionsPageModule {}
