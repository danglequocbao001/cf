import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RewardPointsPageRoutingModule } from './reward-points-routing.module';

import { RewardPointsPage } from './reward-points.page';
import { ComponentsModule } from 'src/app/components/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RewardPointsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [RewardPointsPage]
})
export class RewardPointsPageModule {}
