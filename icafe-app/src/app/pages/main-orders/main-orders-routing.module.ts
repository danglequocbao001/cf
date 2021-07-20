import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainOrdersPage } from './main-orders.page';

const routes: Routes = [
  {
    path: '',
    component: MainOrdersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainOrdersPageRoutingModule {}
