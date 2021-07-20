import { Injectable, Injector } from "@angular/core";
import { HttpService } from "./http.service";
import { Storage } from '@ionic/storage';
import { CONFIG } from '../../constants';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable()
export class BookingService extends HttpService {
    private totalBookingSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    tt = 0;        
    constructor(
        inject: Injector,
        private storage: Storage
    ) {
        super(inject);
    }
    public setBooking(value:any){
        this.totalBookingSubject.next(value);
    }
    public getBooking():Observable<any>{
        return this.totalBookingSubject.asObservable();
    }
    public clear(){
        this.totalBookingSubject.next(null);
    }
    async createbooking(body){
        return await this.$post(CONFIG.API.BOOKING.CREATEBOOKING,body);
    }
    public async getBookingHistory(){
        return await this.$get(CONFIG.API.BOOKING.HISTORY);
    }
    async getCoffeeServiceTypes(){
        return await this.$get(CONFIG.API.BOOKING.SERVICELIST('coffee'));
    }
    async getGameServiceTypes(){
        return await this.$get(CONFIG.API.BOOKING.SERVICELIST('game'));
    }
}
