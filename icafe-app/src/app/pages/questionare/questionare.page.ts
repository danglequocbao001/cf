import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { QuestionsService, UserPointsService } from 'src/app/@core-app';
@Component({
  selector: 'app-questionare',
  templateUrl: './questionare.page.html',
  styleUrls: ['./questionare.page.scss'],
})
export class QuestionarePage implements OnInit {
  uniqueId1: string;
  totalScore = 0;
  checkTotalScore = 0;
  totalTurn = 0;
  getPoints: number;
  getTurns: number;
  buySlots:number;

  constructor(private router: Router,
    private questionService: QuestionsService,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private userPointsService: UserPointsService,
    public alertController: AlertController) { }

  ngOnInit() { 
    this.getTotalPointAndTurn();
    this.getUserPoints();
  }
  
  ionViewWillEnter(){
    this.getTotalPointAndTurn();
  }

  back(){
    this.router.navigate(['/main-menu']);
  }
  playByTopic() {
    this.router.navigate(['/questionare/play-by-topic']);
  }
  playByLevel() {
    this.router.navigate(['/questionare/play-by-level']);
  }
  rule() {
    this.router.navigate(['/questionare/rule']);
  }
  
  buyMoreTurn() {
    this.presentAlertMultipleButtons();
    this.getUserPoints();
  }

  async getTotalPointAndTurn() {
    this.questionService.getUserPointQuestion().then(data => {
      this.checkTotalScore = data.score;
      this.totalScore = data.score;
      this.totalTurn = data.playing_slots;
      console.log(this.totalTurn);
    })
  }

  async successPlusPoint() {
    const toast = await this.toastController.create({
      message: 'Thành công!',
      duration: 2000,
      color: 'success',
    });
    toast.present();
  }

  async failPlusPoint() {
    const toast = await this.toastController.create({
      message: 'Bạn đã mua quá 5 lượt trong ngày!',
      duration: 1000,
      color: 'warning',
    });
    toast.present();
  }

  async waitToPlusPoint() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Đang cộng điểm...',
      duration: 500,
    });
    await loading.present();
  }

  async notEnoughPoint() {
    const toast = await this.toastController.create({
      message: 'Không đủ điểm thưởng!',
      duration: 1000,
      color: 'warning',
    });
    toast.present();
  }
  
  getUserPoints() {
    this.userPointsService.getUserPoint().then((data) => {
      this.getPoints = data.score;  
      this.getTurns = data.playing_slots;
      this.buySlots = data.buy_slots; 
      // console.log('data: ', this.getPoints)
      // const y:number =+ this.getPoints;
      // y = this.currencyPipe.transform(this.getPoints, '', true, '1.2-2')
    })
  }
  
  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      message: 'Bạn muốn mua thêm lượt chơi với 3000 điểm tích lũy?',
      buttons: [
        {
          text: 'Hủy',
          handler: () => {
            
          }
        },
        {
          text: 'Đồng ý',
          handler: () => {
            if(this.totalScore >= 3000) {
              this.questionService.byMoreTurn().then(data =>{
                if(data.message == "you use over 5 buying slots per day") {
                  this.failPlusPoint();
                }
                else {
                  this.getTotalPointAndTurn();
                  this.waitToPlusPoint();
                  this.successPlusPoint();
                }
              })
              // this.router.navigate(['/main-menu']);
            }
            else {
              this.notEnoughPoint();
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
