import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { AuthService, UserSerivce, ProductSerivce, StorageService, PromotionSerivce, OrderService, BookingService, PaymentService ,QuestionsService, HttpService, NewsService, UserPointsService } from './@core-app';
import { ProductGroupSerivce } from './@core-app/providers/services/productGroup.service';
import {NativeAudio} from '@ionic-native/native-audio/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { Network } from '@ionic-native/network/ngx';
import { PaymentPage } from './pages/payment/payment.page';
import { MainOrdersPage } from './pages/main-orders/main-orders.page';
import { OrderHistoryService } from './@core-app/providers/services/order-history.service';
import { ToppingService } from './@core-app/providers/services/topping.service';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    FormsModule,
    BrowserModule, 
    ReactiveFormsModule,
    HttpClientModule,
    IonicModule.forRoot(), 
    IonicStorageModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    HttpService,
    NativeAudio,
    StatusBar,
    SplashScreen,
    AuthService,
    UserSerivce,
    Camera,
    ProductSerivce,
    ProductGroupSerivce,
    StorageService,
    PromotionSerivce,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Geolocation,
    NativeGeocoder,
    OrderService,
    BookingService,
    PaymentService,
    QuestionsService,
    Diagnostic,
    NewsService,
    Network,
    UserPointsService,
    PaymentPage,
    MainOrdersPage,
    OrderHistoryService,
    ToppingService,
    LocationAccuracy,
    
  ],
  
  bootstrap: [AppComponent],
  // schemas:[
  //   CUSTOM_ELEMENTS_SCHEMA
  // ]
})
export class AppModule {}
