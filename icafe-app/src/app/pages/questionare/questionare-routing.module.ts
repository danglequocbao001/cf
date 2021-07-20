import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionarePage } from './questionare.page';

const routes: Routes = [
  {
    path: '',
    component: QuestionarePage
  },
  {
    path: 'play-by-topic',
    loadChildren: () => import('./play-by-topic/play-by-topic.module').then( m => m.PlayByTopicPageModule)
  },
  {
    path: 'play-by-level',
    loadChildren: () => import('./play-by-level/play-by-level.module').then( m => m.PlayByLevelPageModule)
  },
  {
    path: 'questions',
    loadChildren: () => import('./questions/questions.module').then( m => m.QuestionsPageModule)
  },
  {
    path: 'rule',
    loadChildren: () => import('./rule/rule.module').then( m => m.RulePageModule)
  },
  {
    path: 'win',
    loadChildren: () => import('./win/win.module').then( m => m.WinPageModule)
  },
  {
    path: 'lose',
    loadChildren: () => import('./lose/lose.module').then( m => m.LosePageModule)
  },  {
    path: 'level-questions',
    loadChildren: () => import('./level-questions/level-questions.module').then( m => m.LevelQuestionsPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionarePageRoutingModule {}
