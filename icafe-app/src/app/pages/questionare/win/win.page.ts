import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { QuestionsService } from 'src/app/@core-app/providers/services/questions.service';

@Component({
  selector: 'app-win',
  templateUrl: './win.page.html',
  styleUrls: ['./win.page.scss'],
})
export class WinPage implements OnInit {

  winAll = new Audio();
  totalScore = 0;
  turn = 0;

  constructor( private router: Router,private modalController: ModalController, private questionService: QuestionsService) { }

  ngOnInit() {
    // this.getTotalScore();
    // this.nativeAudio.preloadSimple('winAll',"../../assets/audios/game-audios/win-all-1.mp3");
    // this.nativeAudio.play('winAll');
    this.winAll.src = "../../assets/audios/game-audios/win-all-1.mp3";
    this.winAll.load();
    this.winAll.play();
    this.getTotalScore();
    this.getTurn();
  }
  questionare() {
    this.modalController.dismiss({
      'dismissed': true
    });
    this.router.navigate(['/questionare']);

    this.winAll.pause();
  }

  getTotalScore(){
    setTimeout(() => {
      this.totalScore = localStorage.totalScore;
    }, 1000);
  }

  getTurn() {
    this.questionService.getUserPointQuestion().then(data =>{
      this.turn = data.playing_slots;
    })
  }

}
