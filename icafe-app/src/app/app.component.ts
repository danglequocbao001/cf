import { Component } from '@angular/core';

import { AlertController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/vi';
import { AuthService, StorageService } from './@core-app';
import { Network } from '@ionic-native/network/ngx';

registerLocaleData(localeFr, 'vi');

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private storageService: StorageService,
    private network: Network,
    public alertController: AlertController,
    // public onlineOffline: boolean = navigator.onLine,

  ) {
    this.initializeApp();
    this.setStorageAccount();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  setStorageAccount() {
    const temp = this.authService.isAuthenticated();
    if(temp === true) {
      this.storageService.setInfoAccount();
    }
  }
  disconnectSubscription = this.network.onDisconnect().subscribe(()=>{
    this.presentAlert();
  })
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Disconected',
      message: 'vui long kiem tra ket noi',
      buttons: ['OK']
    });

    await alert.present();
  }
}
