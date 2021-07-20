import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionsPageRoutingModule } from './questions-routing.module';

import { QuestionsPage } from './questions.page';
import { WinPageModule } from '../win/win.module';
import { LosePageModule } from '../lose/lose.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionsPageRoutingModule,
    WinPageModule,
    LosePageModule,
  ],
  declarations: [QuestionsPage]
})
export class QuestionsPageModule {}
