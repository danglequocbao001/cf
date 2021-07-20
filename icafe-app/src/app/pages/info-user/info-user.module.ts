import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InfoUserPageRoutingModule } from './info-user-routing.module';

import { InfoUserPage } from './info-user.page';
import { HeadTitleComponent } from 'src/app/components/head-title/head-title.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    InfoUserPageRoutingModule,

  ],
  declarations: [InfoUserPage, HeadTitleComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class InfoUserPageModule {}
