import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GamebookingPage } from './gamebooking.page';

const routes: Routes = [
  {
    path: '',
    component: GamebookingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamebookingPageRoutingModule {}
