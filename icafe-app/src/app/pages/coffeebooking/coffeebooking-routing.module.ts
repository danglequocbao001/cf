import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoffeebookingPage } from './coffeebooking.page';

const routes: Routes = [
  {
    path: '',
    component: CoffeebookingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoffeebookingPageRoutingModule {}
