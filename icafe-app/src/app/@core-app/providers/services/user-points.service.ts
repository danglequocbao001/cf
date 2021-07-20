import { Storage } from '@ionic/storage';
import { Injectable, Injector } from '@angular/core';
import { CONFIG } from '../../constants';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserPointsService extends HttpService {
  constructor(
    inject: Injector,
    private storage: Storage) {
      super(inject);
  }
  
  async getUserPoint() {
    return this.$get(CONFIG.API.USER_POINT.GETUSERPOINT);
  }
}
