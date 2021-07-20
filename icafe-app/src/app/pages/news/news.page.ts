import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewsService} from 'src/app/@core-app';
import { AlertController, LoadingController } from '@ionic/angular';
import { UserSerivce } from 'src/app/@core-app';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  getData: any = [];
  idNew = '';
  
  constructor(
    private router: Router,
    private newsService: NewsService,
    private loadingController: LoadingController,
    private userservice: UserSerivce,
    private alertCtrl: AlertController
    ) { }

  ngOnInit() {
    this.getAllNews();
    // this.presentLoading();
    this.userservice.getInfoUser().then(()=>{},(err)=>{
      this.bannedError();
  })
  }
  back(){
    this.router.navigate(['/main-menu']);
  }
  detail(item){
    this.idNew = item.id;
    this.router.navigate(['/news/news-detail']);
    this.changeNewsData();
  }

  getAllNews() {
    this.newsService.getAllNews().then((data) => {
      this.getData = data.news;
      this.loadingController.dismiss();
    })
  }

  changeNewsData() {
    localStorage.setItem("changeNewsData", JSON.stringify(this.idNew));
    let dataToChange = JSON.parse(localStorage.getItem("changeNewsData"));
    // console.log('changeData: ' ,dataToChange);
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
