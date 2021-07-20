import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { QuestionsService } from 'src/app/@core-app';

@Component({
  selector: 'app-play-by-topic',
  templateUrl: './play-by-topic.page.html',
  styleUrls: ['./play-by-topic.page.scss'],
})
export class PlayByTopicPage implements OnInit {

  // @Output() changeTopicDataEvent = new EventEmitter<number>();

  // changeTopicData(numberChange: number) {
  //   this.changeTopicDataEvent.emit(numberChange);
  // }
  
  getData: any = [];
  topic = '';
  totalTurn = 0;
  // dataSource: any;
  
  constructor( private nativeAudio: NativeAudio, 
    private router: Router,
    private questionsService: QuestionsService) { }

  ngOnInit() {
    this.getQuestionByTopic();
    this.getTotalPointAndTurn();
    // localStorage.setItem('dataSource', this.dataSource.length);
    // console.log(localStorage.getItem('dataSource'));
  }

  
  getQuestionByTopic() {
    this.questionsService.getListQuestionByTopic().then((data) => {
      this.getData = data.question_topics;
      // console.log('data: ' + this.getData);
    })
  }
  
  back() {
    this.router.navigate(['/questionare']);
  }

  chooseTopic(item) {
    this.topic = item.id;
    // console.log('topic: ' + this.topic);
    this.changeData();
    this.questionsService.lostTurn().then(data =>{
      // console.log('mat 1 luot choi', data);
    })
    this.router.navigate(['/questionare/questions']);
  }

  changeData() {
    localStorage.setItem("dataToChange", JSON.stringify(this.topic));
    let dataToChange = JSON.parse(localStorage.getItem("dataToChange"));
    // console.log('changeData: ' ,dataToChange);
  }

  getTotalPointAndTurn() {
    this.questionsService.getUserPointQuestion().then(data => {
      this.totalTurn = data.playing_slots;
      console.log(this.totalTurn);
    })
  }
}
