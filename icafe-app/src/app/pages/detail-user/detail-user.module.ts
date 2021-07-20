import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailUserPageRoutingModule } from './detail-user-routing.module';

import { DetailUserPage } from './detail-user.page';
import { ComponentsModule } from '../../components/component.module';
import { InfoUserPage } from '../info-user/info-user.page';
import { ChangePasswordPage } from '../change-password/change-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ReactiveFormsModule,
    DetailUserPageRoutingModule
  ],
  declarations: [DetailUserPage, InfoUserPage, ChangePasswordPage]
})
export class DetailUserPageModule {}
