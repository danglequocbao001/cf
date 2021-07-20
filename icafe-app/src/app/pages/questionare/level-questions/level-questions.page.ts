import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController, Platform } from '@ionic/angular';
import { BehaviorSubject} from 'rxjs';
import { ToastController } from '@ionic/angular';
import { QuestionsService } from 'src/app/@core-app';
import { WinPage } from '../win/win.page';
import { LosePage } from '../lose/lose.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-level-questions',
  templateUrl: './level-questions.page.html',
  styleUrls: ['./level-questions.page.scss'],
})
export class LevelQuestionsPage implements OnInit {

  time: BehaviorSubject<string> = new BehaviorSubject('00:00');

  timer: number; 

  soundTrack1: string;
  rightAnswer1: string;
  wrongAnswer1: string;

  soundTrack1Adr = new Audio();
  rightAnswer1Adr = new Audio();
  wrongAnswer1Adr = new Audio();
  nextQuestionAdr = new Audio();
  wrongAnswerDuckAdr = new Audio();

  private isPlaying: boolean = true;

  private backButton: any;

  isClicked = false;
  choice ='';
  isConfirmed = false;
  j = 0;
  isRunOutOfQues = true;
  
  heart = 3;

  delayTimeToast = 1000;

  score = 1;
  checkScore = 8;
  userScore = 0;
  totalScore = 0;

  toBeCountinuing = false;

  forTimer: any;

  scores = [
    {
      level: '10',
    },
    {
      level: '9',
    },
    {
      level: '8',
    },
    {
      level: '7',
    },
    {
      level: '6',
    },
    {
      level: '5',
    },
    {
      level: '4',
    },
    {
      level: '3',
    },
    {
      level: '2',
    },
    {
      level: '1',
    }
  ];

  upscores = [
    {
      level: '+2đ',
    },
    {
      level: '+2đ',
    },
    {
      level: '+2đ',
    },
    {
      level: '+2đ',
    },
    {
      level: '+2đ',
    },
    {
      level: '+2đ',
    },
    {
      level: '+2đ',
    },
    {
      level: '+2đ',
    },
    {
      level: '+2đ',
    },
    {
      level: '+0đ',
    }
  ];

  getData = [];

  checkListAnswer = {
    answers : []
  }

  checkLevel = JSON.parse(localStorage.getItem("dataToChangeLevel"));

  constructor(public navCtrl: NavController,
    public modalController: ModalController,
    public toastController: ToastController,
    private questionsService: QuestionsService,
    private platform: Platform,
    private alertController: AlertController,
    private router: Router,) {
      this.preloadMusicAndroid();
      this.playMusic();
    }

  ngOnInit() {
    this.startTimer(120);
    this.getQuestionLevel();
    this.blockBackBtn();  
    this.checkLevelEazy();
    // this.questionsService.lostTurn().then(data =>{
    //   // console.log('mat 1 luot choi', data);
    // })
  }

  checkLevelEazy() {
    if(this.checkLevel === "level_1") {
      this.heart = 1;
      this.checkScore = 10;
    }
  }

  preloadMusicAndroid(){
    this.soundTrack1Adr.src = "../../assets/audios/game-audios/soundtrack1.mp3"; this.soundTrack1Adr.load();
    this.nextQuestionAdr.src = "../../assets/audios/game-audios/next-question.mp3"; this.nextQuestionAdr.load();
    this.wrongAnswerDuckAdr.src = "../../assets/audios/game-audios/wrong-answer-duck.mp3"; this.wrongAnswerDuckAdr.load();
  }

  btnActivate(e) {
    this.isClicked = true;
    let answer = document.querySelectorAll('.answer');
    answer.forEach(element => {
      element.classList.remove(('active-button'));
      document.getElementById('confirm').style.background = '#64C18E';
    });
    e.target.classList.add('active-button');
  }

  getQuestionLevel() {
    this.questionsService.getQuestionLevel(localStorage.dataToChangeLevel).then((data) => {
      this.getData = data.questions;
      // console.log(data);
      // console.log(this.getData);
    })
  }

  getTotalScore() {
    localStorage.setItem("totalScore", JSON.stringify(this.totalScore));
    // let totalScore = JSON.parse(localStorage.getItem("totalScore"));
    // console.log('changeData: ' ,dataToChange);
  }

  playMusic() {
    this.soundTrack1Adr.play();
  }

  stopMusic() {
    this.soundTrack1Adr.pause();
  }

  async openModalWin() {
    const modal = await this.modalController.create({
      component: WinPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
  async openModalLose() {
    const modal = await this.modalController.create({
      component: LosePage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
  
  startTimer(duration: number) {
    this.timer = duration;
    this.forTimer =  setInterval( () => {
      this.updateTimeValue();
    }, 1000);
  }
  stopTimer() {
    clearInterval(this.forTimer);
  }

  updateTimeValue() {
    let minutes: any = this.timer / 60;
    let seconds: any = this.timer % 60;

    minutes = String('0' + Math.floor(minutes)).slice(-2);
    seconds = String('0' + Math.floor(seconds)).slice(-2);

    const text = minutes + ':' + seconds;
    this.time.next(text);

    --this.timer;

    if(this.timer == 0) {
      this.stopTimer();
      this.openModalLose();
      this.stopMusic();
      
    }
  }
  
  musicController() {
    if(this.isPlaying){
      this.soundTrack1Adr.pause();
      this.isPlaying = false;
      document.getElementById('sound-icon-check').style.color = '#A3A3A3';
    }
    else {
      this.soundTrack1Adr.play();
      this.isPlaying = true;
      document.getElementById('sound-icon-check').style.color = '#64C18E';
    }
  }

  choose(item) {
    this.choice = item.id;
    // console.log('choice: ' + this.choice);
  }

  choosedId = '';
  choosed(item) {
    this.choosedId = item;
  }
   key='';
  getKey(object, value) {
    this.key = Object.keys(object).find(key => object[key] === value);
    // console.log('key: ' ,this.key)
  }
  
  storage(){
    // confirm() {
    //   this.isConfirmed = false;
    //   if(this.choice === this.questionStuff[this.j].rightAnswerId) {
    //     // this.nativeAudio.play('rightAnswer2');
    //     this.nativeAudio.play('nextQuestion');
    //     this.rightChoosed();
    //     this.score ++;
    //     this.choice = '';
    //   } 
    //   else {
    //     // this.isConfirmed = true;
    //     // this.nativeAudio.play('wrongAnswer1');
    //     this.nativeAudio.play('wrongAnswerDuck')
    //     console.log('wrong');
    //     this.heart--;
    //     this.wrongChoosed();
    //     this.choice = '';
    //     if(this.heart == 0) {
    //       this.openModalLose();
    //     }
    //     for(let i of this.questionStuff[this.j].answers) {
    //       if(i.id == this.choice) {
    //         i.isWrong = 1;
    //       } 
    //       else {
    //         if(i.id == this.questionStuff[this.j].rightAnswerId) {
    //           i.isWrong = 2;
    //         }
    //       }
    //     }
    //   }
    //   if(this.j < 9) {
    //     this.j ++;
    //   }
    //   if (this.score == 9) {
    //     this.stopMusic();
    //     this.openModalWin();
    //   }
    // }
  }

  confirm() {
    this.isConfirmed = false;

    const checkAnswer = {
      id : this.getData[this.j].id,
      right_answer: this.key,
    }
    
    this.checkListAnswer.answers.push({id: this.getData[this.j].id, right_answer: this.key});
    
    this.questionsService.checkAnswer(checkAnswer).then(data =>{
      // console.log(data);
      if(data.correct == true) {
        this.nextQuestionAdr.play();
        this.rightChoosed();
        this.score++;
        this.userScore++;
        this.choosedId = '';
      }
      else {
        this.wrongAnswerDuckAdr.play();
        this.heart--;
        this.wrongChoosed();
        this.choosedId = '';
        if (this.heart == 0) {
          this.stopTimer();
          this.openModalLose();
          this.stopMusic();
          
        }
      }

      if(this.userScore == this.checkScore) {
        this.stopTimer();
        this.stopMusic();
        this.openModalWin();
        this.questionsService.checkTotalScore(this.checkListAnswer).then(data =>{
          this.totalScore = data.score;
          this.getTotalScore();
          // console.log(data.score);
        })
      }
    })
    
    if (this.j < 10) {
      this.j++;
    }


    {
    // if(this.checkLevelStatus == 'eazy') {
    //   this.checkScore = 10;
    //   if (this.userScore == this.checkScore) {
    //     this.stopTimer();
    //     this.stopMusic();
    //     this.openModalWin();
    //     this.questionsService.checkTotalScore(this.checkListAnswer).then(data =>{
    //       this.totalScore = data.score;
    //       this.getTotalScore();
    //       console.log(data.score);
    //     })
    //   } 
    // }
    // if(this.checkLevelStatus == 'hard') {
    //   this.checkScore = 8;
    //   if(this.userScore == this.checkScore) {
    //     this.countinueChoosed;
    //   }
    //   if(this.heart == 0) {
    //     this.stopTimer();
    //     this.stopMusic();
    //     this.openModalWin();
    //   }
    // }
    }
  }

  async rightChoosed() {
    const toast = await this.toastController.create({
      message: 'Đúng rồi!',
      color: 'success',
      duration: this.delayTimeToast
    });
    toast.present();
  }

  async wrongChoosed() {
    if(this.heart > 0) {
      const toast = await this.toastController.create({
        message: 'Sai mất tiu rồi, bạn còn ' + this.heart +' mạng thôi!',
        color: 'warning',
        duration: this.delayTimeToast
      });
      toast.present();
    }
    else {
      this.stopMusic();
      const toast = await this.toastController.create({
        message: 'Bạn hết mạng rồi!',
        color: 'danger',
        duration: this.delayTimeToast
      });
      toast.present();
      this.stopTimer();
    }
  }

  async countinueChoosed() {
    const toast = await this.toastController.create({
      message: 'Bạn đã qua màn, hãy chơi tiếp để được cộng thêm điểm nhé!',
      color: 'success',
      duration: 3000,
    });
    toast.present();
  }

  async timeOver() {
    this.stopMusic();
    this.wrongAnswer1Adr.play();
    const toast = await this.toastController.create({
      message: 'Hết giờ rồi!',
      color: 'warning',
      duration: this.delayTimeToast
    });
    toast.present();
  }

  async presentAlert() {
    document.addEventListener("backbutton",function(e) {}, false);
    const alert = await this.alertController.create({
      cssClass: 'logout-alert',
      message: 'Bạn sẽ bị mất lượt chơi này nếu thoát, chắc chắn muốn thoát?',
      buttons: [
        {
          text: 'Tiếp tục chơi',
          handler: () => {}
        },
        {
          text: 'Thoát',
          handler: () => {
            this.stopMusic();
            this.router.navigate(['/questionare']);
            this.stopTimer();
          }
        },

      ]
    });
    await alert.present();
  }

  blockBackBtn() {
    this.backButton = this.platform.backButton.subscribe(() => {
      // this.presentAlert();
    })
    this.platform.ready().then(() => {
      this.platform.backButton.subscribeWithPriority(9999, () => {
        document.addEventListener('backbutton', function (event) {
          event.preventDefault();
          event.stopPropagation();
        }, false);
      });
      // this.statusBar.styleDefault();
    });
  }
}