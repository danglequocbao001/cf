import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuffetbookingPage } from './buffetbooking.page';

const routes: Routes = [
  {
    path: '',
    component: BuffetbookingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuffetbookingPageRoutingModule {}
