import { Injectable } from "@angular/core";
import { Subscription, BehaviorSubject, Observable } from "rxjs";
import { Storage } from '@ionic/storage';
import { ILocation } from 'src/app/interfaces/ILocation';

@Injectable()
export class CheckGPS {
  constructor(
    private storage: Storage
  ) { }
  setLocationOrder(value){
    localStorage.setItem('location', value);
  }
  getLocationOrder(){
    localStorage.getItem('location');
  }
  checkLoction(){
    let tmp = JSON.stringify(this.getLocationOrder());
    if(tmp.length > 0)  return true
      else  return false;
  }
}
