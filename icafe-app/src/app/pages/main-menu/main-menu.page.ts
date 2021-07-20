import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { error } from 'protractor';
import { AuthService, PromotionSerivce, UserSerivce} from 'src/app/@core-app';

@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.page.html',
    styleUrls: ['./main-menu.page.scss'],
})
export class MainMenuPage implements OnInit {
    pic: any;
    codePromotion = '';

    constructor(
        private authService: AuthService, 
        private router: Router,
        private promotionService: PromotionSerivce,
        private userservice: UserSerivce,
        private navCtrl : NavController,
        private loadingController: LoadingController,
        private alertCtrl : AlertController) { }

    ngOnInit() {
        this.getPromotions();
        this.presentLoading();
        this.userservice.getInfoUser().then(()=>{},(err)=>{
            this.bannedError();
        })
    }

    menuProduct(){
        
        this.router.navigate(['/main-orders']);
    }
    booking(){
        this.router.navigate(['/booking']);
    }
    detailUser(){
        this.userservice.getInfoUser().then((data)=>{
            this.router.navigate(['detail-user']);   
            this.router.navigate(['detail-user'],{
              queryParams:{
                data: JSON.stringify(data['avatar'])
              }
            });
          }, (err)=>{
              this.bannedError();
          })
    }
    questionare(){
        this.router.navigate(['/questionare']);
    }
    news(){
        this.router.navigate(['/news']);
    }
    goToPromotion(dataPro) {
        this.codePromotion = dataPro.code;
        // console.log(this.codePromotion);
        localStorage.setItem("codePromotion", JSON.stringify(this.codePromotion));
        let codePromotion = JSON.parse(localStorage.getItem("codePromotion"));
        setTimeout(() => {
            this.router.navigate(['main-menu/promotion-detail']);
        }, 0);
        
    }
    getData: any = [];
    getSlideData: any = [];
    getPromotions() {
        this.promotionService.getPromotions().then((data) => {
            this.getData = data.promotions;
            this.loadingController.dismiss();
            // console.log(this.getData);
        }, error=> this.loadingController.dismiss()),

        this.promotionService.getSlides().then((slideData) => {
            this.getSlideData = slideData.slides;
        })
    }
    async presentLoading() {
        const loading = await this.loadingController.create({
          cssClass: 'my-custom-class',
          message: 'Đang tải dữ liệu',
        });
        await loading.present();
    
        const { role, data } = await loading.onDidDismiss();
        console.log('Loading dismissed!');
      }
    async bannedError(){
        const alert = await this.alertCtrl.create({
            cssClass: 'my-custom-class',
            header: 'Tài khoản bị khóa',
            message: 'Tài khoản của bạn đã bị khóa, vui lòng liên hệ admin',
            buttons: [ 
              {
                text: 'Xác nhận`',
                handler: () => {
                  this.router.navigate(['auth/login']);
                }
              }
            ]
        });
        await alert.present();
    }
}