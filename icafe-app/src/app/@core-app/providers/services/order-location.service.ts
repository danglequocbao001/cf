import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderLocationService {

  constructor() { }
  setLocationOrder(value){
    localStorage.setItem('location', JSON.stringify(value));
  }
  getLocationOrder(){
    return JSON.parse(localStorage.getItem('location'));
  }
  checkLoction(){
    let tmp = JSON.stringify(this.getLocationOrder());
    if(tmp != null)  return true
      else  return false;
  }
}