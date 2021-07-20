import { Injectable, Injector } from "@angular/core";
import { HttpService } from "./http.service";
import { Storage } from '@ionic/storage';
import { CONFIG } from '../../constants';
@Injectable()
export class PaymentService extends HttpService {
    
    constructor(
        inject: Injector,
        private storage: Storage
    ) {
        super(inject);
    }
    async momoPayment(data){
        return await this.$post('/payment/request_momo_payment',data);
    }
    async cashPayment(data){
        return await this.$post_payment('/payment/cash_payment/update_order_status',data);
    }
}

// export class PaymentService2 extends HttpService2 {
    
//     constructor(
//         inject: Injector,
//         private storage: Storage
//     ) {
//         super(inject);
//     }
//     // async momoPayment(data){
//     //     return await this.$post('/payment/request_momo_payment',data);
//     // }
//     async cashPayment(data){
//         return await this.$post('/payment/cash_payment/update_order_status',data);
//     }
// }