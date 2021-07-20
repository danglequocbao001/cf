import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Storage} from '@ionic/storage';
import { AuthService } from '../@core-app';
// import { NetworkService } from '../@core-app/providers/services/network.service';
// import { Network } from '@ionic-native/network/ngx';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss']
})
export class TabsPage {
    slideOpts = {
        initialSlide: 1,
        speed: 400
    };
    constructor(private router: Router, private storage: Storage, private authService: AuthService, ) {
        if(this.authService.isAuthenticated()){
            this.router.navigate(['main-menu']);
        }
     }
    // ngOnInit(): void {
    //     console.log('[Home] OnInit');
    //     this.networkSubscriber();
    // }

    login(){
        this.router.navigateByUrl("/auth/login");
    }
    register(){
        this.router.navigate(['auth/register']);
    }

    // openAuth(link:string){
    //     this.router.navigate([`auth/${link}`]);
    // }

    // checkNetworkConnection() {
    //     let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
    //         console.log('network was disconnected :-(');
    //     });
    //     // disconnectSubscription.unsubscribe();
    // }

    // checkNetwork() {
    //     if (!navigator.onLine) {
    //         //Do task when no internet connection
    //         console.log('no internet connection');
    //     }
    // }

    // networkSubscriber(): void {
    //     this.networkService
    //         .getNetworkStatus()
    //         // .pipe(debounceTime(300))
    //         .subscribe((connected: boolean) => {
    //             let isConnected = connected;
    //             console.log('[Home] isConnected', isConnected);
    //             // this.handleNotConnected(connected);
    //         });
    // }


}
