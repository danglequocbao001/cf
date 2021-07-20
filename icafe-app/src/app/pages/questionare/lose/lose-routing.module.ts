import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LosePage } from './lose.page';

const routes: Routes = [
  {
    path: '',
    component: LosePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LosePageRoutingModule {}
