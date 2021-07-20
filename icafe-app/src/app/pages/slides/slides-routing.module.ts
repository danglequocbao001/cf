import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SlidesPage } from './slides.page';
import { TabsPage } from 'src/app/tabs/tabs.page';

const routes: Routes = [
  {
    path: '',
    component: SlidesPage
  },
  {
    path: 'tabs',
    component: TabsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SlidesPageRoutingModule {}
