import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { NavParams, NavController } from '@ionic/angular';
import { InfoUserPage } from '../info-user/info-user.page';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController,AlertController  } from '@ionic/angular';
import { AuthService, UserSerivce } from 'src/app/@core-app';
import { AuthGuard } from 'src/app/@core-app/guard/auth.guard';
import { userInfo } from 'os';
@Component({
    selector: 'app-detail-user',
    templateUrl: './detail-user.page.html',
    styleUrls: ['./detail-user.page.scss'],
})
export class DetailUserPage implements OnInit {
    userInfo: User;
    image_url:any;
    constructor(private authGuard: AuthGuard, private authService: AuthService, 
        private navCtrl: NavController, private router: Router,
        private modalController: ModalController,
        public alertController: AlertController,
        private userservice: UserSerivce,
        private route: ActivatedRoute,
        private auth: AuthService
        ) { 
            // console.log('vaofoooooo');
            
        }
        async presentAlert(message: string) {
            const alert = await this.alertController.create({
              cssClass: 'my-custom-class',
              header: 'Thông báo',
              message: message,
              buttons: [
                  {
                      text:'Không',
                      role:'cancel'
                  },
                  {
                    text:'Có',
                    handler:()=>{
                        this.auth.logout();
                        this.router.navigate(['auth/login']);
                    }
                },
              ]
            });
        
            await alert.present();
          }
    ngOnInit() {
        this.getUserInfo();
    }
    ngOnDestroy() {
        // console.log('ngOnDestroy');
    }
    ionViewDidEnter(){
        // console.log('vao will enter');
        
        // this.getUserInfo();
        // console.log('info',this.getUserInfo());
        
        // if(this.userInfo.avatar == null) {
        //     this.image_url = 'assets/images/user-info-green.svg';
        // }
        // else this.image_url = this.userInfo.avatar;
        // console.log('a',this.userInfo);
        
        // console.log(this.image_url);

        this.route.queryParams.subscribe((params) =>{
            // console.log('params',params);
            if(params === null || params === undefined) {
                // console.log('zo');
                this.getUserInfo();
            }else{
                // console.log('zo2');
                this.image_url = JSON.parse(params["data"]);
                // console.log(JSON.parse(params["data"]));
            } 
        })
    }
    ionviewDidLoad(){
        // console.log('ionViewDidLoad');
    }
    
    getUserInfo() {
        this.authService.info().subscribe(res => this.userInfo = res);
    }

    openPage(){
        if(this.authGuard.userInfo){
            this.router.navigateByUrl("/detail-user/info-user")
        }
    }
    openReward(){
        if(this.authGuard.userInfo){
            this.userservice.getInfoUser().then((data)=>{
                // this.router.navigate(['detail-user']);   
                this.router.navigate(['detail-user/reward-points'],{
                  queryParams:{
                    data: JSON.stringify(data['avatar'])
                  }
                });
                // console.log('a',data['avatar']);
                
              })
            // this.router.navigate(['detail-user/reward-points']);
        }
    }
    oderHistory(){
        if(this.authGuard.userInfo){
            this.router.navigate(['detail-user/order-history']);
        }
    }
    back(){
        this.router.navigate(['main-menu']);
    }
    logout(){
        this.presentAlert('Bạn có thực sự muốn đăng xuất?')
    }
    paymentMethod(){
        this.router.navigateByUrl('payment-method');
    }
    // TODO: logout 
    // async presentModal() {
    //     const modal = await this.modalController.create({
    //       component: , cssClass: 'selector-modal'})
        
    //     return await modal.present();
    //   }

}
function dataURItoBlob(dataURI) {
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataURI.split(',')[1]);
    }
    else {
      byteString = encodeURI(dataURI.split(',')[1]);
    }
  
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mimeString });
  }