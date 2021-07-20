import { Injectable, Injector } from '@angular/core';
import { CONFIG } from '../../constants/API';
import { HttpService } from './http.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class NewsService extends HttpService {

  constructor(
    inject: Injector,
    private storage: Storage
  ) {
      super(inject);
  }

  async getAllNews() {
    return await this.$get(CONFIG.API.NEWS.GETNEWS);
  }

  async getNewById(id) {
    return await this.$get(CONFIG.API.NEWS.GETNEWSBYID(id));
  }
  
}
