import { Injectable, Injector } from "@angular/core";
import { HttpService } from "./http.service";
import { Storage } from '@ionic/storage';
import { CONFIG } from '../../constants';
@Injectable()
export class OrderService extends HttpService {
    constructor(
        inject: Injector,
        private storage: Storage
    ) {
        super(inject);
    }
    setPreviousOrder(value){
        localStorage.setItem('previousOrder', value);
    }
    getPreviousOrder(){
        return localStorage.getItem('previousOrder');
    }
    async createorder(body){
        return await this.$post(CONFIG.API.ORDER.CREATEORDER,body);
    }
    deleteOrder(id){
        this.$delete(CONFIG.API.ORDER.DELETE(id));
    }
}
