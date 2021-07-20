import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayByTopicPageRoutingModule } from './play-by-topic-routing.module';

import { PlayByTopicPage } from './play-by-topic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayByTopicPageRoutingModule
  ],
  declarations: [PlayByTopicPage]
})
export class PlayByTopicPageModule {}
