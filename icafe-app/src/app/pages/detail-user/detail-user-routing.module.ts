import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailUserPage } from './detail-user.page';
import { InfoUserPage } from '../info-user/info-user.page';
import { ChangePasswordPage } from '../change-password/change-password.page';
import { LoginPage } from '../login/login.page';

const routes: Routes = [
  {
    path: '',
    component: DetailUserPage
  },
  {
    path: 'info-user',
    component: InfoUserPage
  },
  {
    path: 'change-password',
    component: ChangePasswordPage
  },
  // {
  //   path: 'reward-points',
  //   component: RewardPointsPage
  // },
  // {
  //   path: 'order-history',
  //   component: OrderHistoryPage
  // }
  {
    path: 'reward-points',
    loadChildren: () => import('../reward-points/reward-points.module').then( m => m.RewardPointsPageModule)
  },
  {
    path: 'order-history',
    loadChildren: () => import('../order-history/order-history.module').then( m => m.OrderHistoryPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailUserPageRoutingModule {}
