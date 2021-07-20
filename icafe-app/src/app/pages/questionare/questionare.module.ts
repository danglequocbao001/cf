import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionarePageRoutingModule } from './questionare-routing.module';

import { QuestionarePage } from './questionare.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionarePageRoutingModule, 
  ],
  declarations: [QuestionarePage]
})
export class QuestionarePageModule {}
