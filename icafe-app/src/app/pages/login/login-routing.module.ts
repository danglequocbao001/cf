import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';
import { RegisterPage } from '../register/register.page';
// import { RegisterSuccessPage } from '../register-success/register-success.page';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'register',
    // component: RegisterPage
    loadChildren: ()=> import('../register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'register-success',
    loadChildren: () => import('../register-success/register-success.module').then(m => m.RegisterSuccessPageModule)
    // component: RegisterSuccessPage

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
