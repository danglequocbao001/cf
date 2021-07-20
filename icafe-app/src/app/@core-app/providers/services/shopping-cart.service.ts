import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from './http.service';

interface ShipCost{
  distance:number,
  cost:number
}

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService extends HttpService{
  private shippingSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(
    inject: Injector,
  ) { 
    super(inject);
  }
  public  setShipCost(value:ShipCost){
    this.shippingSubject.next(value);
  }
  public getShipCost():Observable<any>{
    return this.shippingSubject.asObservable();
  }
}