import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { QuestionsService } from 'src/app/@core-app';

@Component({
  selector: 'app-play-by-level',
  templateUrl: './play-by-level.page.html',
  styleUrls: ['./play-by-level.page.scss'],
})
export class PlayByLevelPage implements OnInit {

  getData: any = [];
  level = '';
  totalTurn = 0;
  constructor(private router: Router,
    private nativeAudio: NativeAudio,
    private questionsService: QuestionsService) { }

  ngOnInit() {
    this.getQuestionByLevel();
    this.getTotalPointAndTurn();
  }

  getQuestionByLevel() {
    this.questionsService.getListQuestionByLevel().then((data) => {
      this.getData = data;
      // console.log(this.getData);
    })
  }

  back(){
    this.router.navigate(['/questionare']);

  }
  // levelQuestions() {
  //   this.nativeAudio.stop('soundTrack1');
  //   this.router.navigate(['/questionare/level-questions']);
  // }

  chooseLevel(item) {
    this.level = item.key;
    // console.log('item.key: ',item.key);
    // console.log('level: ' + this.level);
    this.changeData();
    this.questionsService.lostTurn().then(data =>{
      // console.log('mat luot choi', data);
    })
    this.router.navigate(['/questionare/level-questions']);
  }

  changeData() {
    localStorage.setItem("dataToChangeLevel", JSON.stringify(this.level));
    let dataToChangeLevel = JSON.parse(localStorage.getItem('dataToChangeLevel'));
    // console.log('changeDataLevel: ' ,dataToChangeLevel);
  }
  getTotalPointAndTurn() {
    this.questionsService.getUserPointQuestion().then(data => {
      this.totalTurn = data.playing_slots;
      console.log(this.totalTurn);
    })
  }
}
