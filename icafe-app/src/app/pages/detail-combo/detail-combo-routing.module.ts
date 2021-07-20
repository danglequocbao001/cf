import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailComboPage } from './detail-combo.page';

const routes: Routes = [
  {
    path: '',
    component: DetailComboPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailComboPageRoutingModule {}
