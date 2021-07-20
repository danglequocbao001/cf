import { Injectable, Injector } from '@angular/core';
import { CONFIG } from '../../constants/API';
import { HttpService } from './http.service';
import { Storage } from '@ionic/storage';

@Injectable()
export class QuestionsService extends HttpService {
  constructor(
    inject: Injector,
    private storage: Storage) {
      super(inject);
  }

  async getListQuestionByTopic() {
    return await this.$get(CONFIG.API.QUESTION.GETQUESTONBYTOPIC);
  }
  async getListQuestionByLevel() {
    return await this.$get(CONFIG.API.QUESTION.GETQUESTIONBYLEVEL);
  }
  async getQuestionTopic(id) {
    return await this.$get(CONFIG.API.QUESTION.GETQUESTIONTOPIC(id));
  }
  async getQuestionLevel(id) {
    return await this.$get(CONFIG.API.QUESTION.GETQUESTIONLEVEL(id));
  }

  async checkAnswer(request){
    return await this.$post(CONFIG.API.QUESTION.CHECKING, request);
  }
  async checkTotalScore(request){
    return await this.$post(CONFIG.API.QUESTION.TOTAL_SCORE, request);
  }

  async getUserPointQuestion() {
    return await this.$get(CONFIG.API.QUESTION.GETUSERPOINT);
  }
  async byMoreTurn() {
    return await this.$get(CONFIG.API.QUESTION.BUYMORETURN);
  }
  async lostTurn() {
    return await this.$post(CONFIG.API.QUESTION.LOSE);
  }
}
