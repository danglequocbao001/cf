import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './@core-app/guard/auth.guard';
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/slides/slides.module').then( m => m.SlidesPageModule)
  },
  {
      path: 'auth',
      loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
      path: 'main-menu',
      loadChildren: () => import('./pages/main-menu/main-menu.module').then(m => m.MainMenuPageModule), canActivate: [AuthGuard]
  },
  {
      path: 'detail-user',
      loadChildren: () => import('./pages/detail-user/detail-user.module').then(m => m.DetailUserPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'booking',
    loadChildren: () => import('./pages/booking/booking.module').then( m => m.BookingPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'coffeebooking',
    loadChildren: () => import('./pages/coffeebooking/coffeebooking.module').then( m => m.CoffeebookingPageModule), canActivate: [AuthGuard]
  },
  {   
    path: 'item-detail',
    loadChildren: () => import('./pages/item-detail/item-detail.module').then( m => m.ItemDetailPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'payment',
    loadChildren: () => import('./pages/payment/payment.module').then( m => m.PaymentPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'register-success',
    loadChildren: () => import('./pages/register-success/register-success.module').then( m => m.RegisterSuccessPageModule), canActivate: [AuthGuard]
  },
  // {
  //   path: 'reward-points',
  //   loadChildren: () => import('./pages/reward-points/reward-points.module').then( m => m.RewardPointsPageModule)
  // },
  // {
  //   path: 'order-history',
  //   loadChildren: () => import('./pages/order-history/order-history.module').then( m => m.OrderHistoryPageModule)
  // },
  {
    path: 'product',
    loadChildren: () => import('./pages/products/products.module').then( m => m.ProductsPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'main-orders',
    loadChildren: () => import('./pages/main-orders/main-orders.module').then( m => m.MainOrdersPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'gamebooking',
    loadChildren: () => import('./pages/gamebooking/gamebooking.module').then( m => m.GamebookingPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'buffetbooking',
    loadChildren: () => import('./pages/buffetbooking/buffetbooking.module').then( m => m.BuffetbookingPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'booking-detail',
    loadChildren: () => import('./pages/booking-detail/booking-detail.module').then( m => m.BookingDetailPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'model-booking',
    loadChildren: () => import('./pages/model-booking/model-booking.module').then( m => m.ModelBookingPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'booking-combo',
    loadChildren: () => import('./pages/booking-combo/booking-combo.module').then( m => m.BookingComboPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'detail-combo',
    loadChildren: () => import('./pages/detail-combo/detail-combo.module').then( m => m.DetailComboPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'order-detail',
    loadChildren: () => import('./pages/order-detail/order-detail.module').then( m => m.OrderDetailPageModule)
  },
  {
    path: 'questionare',
    loadChildren: () => import('./pages/questionare/questionare.module').then( m => m.QuestionarePageModule)
  },
  {
    path: 'news',
    loadChildren: () => import('./pages/news/news.module').then( m => m.NewsPageModule)
  },
  {
    path: 'payment-method',
    loadChildren: () => import('./pages/payment-method/payment-method.module').then( m => m.PaymentMethodPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'booking-success',
    loadChildren: () => import('./pages/booking-success/booking-success.module').then( m => m.BookingSuccessPageModule)
  }

];
@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule],
})
export class AppRoutingModule { }
