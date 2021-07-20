import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { QuestionsService } from 'src/app/@core-app/providers/services/questions.service';

@Component({
  selector: 'app-lose',
  templateUrl: './lose.page.html',
  styleUrls: ['./lose.page.scss'],
})
export class LosePage implements OnInit {

  loseAll = new Audio();

  turn = 0;

  constructor(private router: Router,private modalController: ModalController, private questionService: QuestionsService) { }

  ngOnInit() {
    this.loseAll.src = "../../assets/audios/game-audios/lose-all.mp3";
    this.loseAll.load();
    this.loseAll.play();
    this.getTurn();
  }
  questionare() {
    this.modalController.dismiss({
      'dismissed': true
    });
    this.router.navigate(['/questionare']);

    this.loseAll.pause();
  }

  getTurn() {
    this.questionService.getUserPointQuestion().then(data =>{
      this.turn = data.playing_slots;
    })
  }
}
