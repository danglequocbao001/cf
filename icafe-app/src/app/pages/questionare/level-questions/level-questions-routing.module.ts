import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LevelQuestionsPage } from './level-questions.page';

const routes: Routes = [
  {
    path: '',
    component: LevelQuestionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LevelQuestionsPageRoutingModule {}
