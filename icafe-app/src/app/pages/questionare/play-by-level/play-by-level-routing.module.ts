import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayByLevelPage } from './play-by-level.page';

const routes: Routes = [
  {
    path: '',
    component: PlayByLevelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayByLevelPageRoutingModule {}
