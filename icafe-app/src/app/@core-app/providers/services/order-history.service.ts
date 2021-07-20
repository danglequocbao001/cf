import { Injectable, Injector } from '@angular/core';
import { CONFIG } from '../../constants';
import { HttpService } from './http.service';
import { Storage } from '@ionic/storage';

@Injectable()
export class OrderHistoryService extends HttpService{
  constructor(
    inject: Injector,
    private storage: Storage
  ){
    super(inject);
  }
  async getOrdersHistory(){
    return await this.$get(CONFIG.API.ORDER.HISTORY);
  }
  async getOrderByID(id){
    return await this.$get(CONFIG.API.ORDER.ORDERBYID(id));
  }
  setID(id){
    localStorage.setItem('orderID', id);
  }
}
