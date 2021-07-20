import { Injectable, Injector } from "@angular/core";
import { HttpService } from "./http.service";
import { Storage } from '@ionic/storage';
import { CONFIG } from '../../constants';
@Injectable()
export class PromotionSerivce extends HttpService {
    constructor(
        inject: Injector,
        private storage: Storage
    ) {
        super(inject);
    }

    // async getPromotions(pageProduct: any){
    //     return await this.$get(CONFIG.API.PROMOTION.GETLISTS, pageProduct);
    // }
    async getPromotions(){
        return await this.$get(CONFIG.API.PROMOTION.GETLISTS);
    }
    async getPromotionHighLight(){
        return await this.$get(CONFIG.API.PROMOTION.GETLISTHIGHTLIGHTL);
    }
    async getPromotionByCode(code){
        return await this.$get(CONFIG.API.PROMOTION.GETBYID(code));
    }
    async applyPromotion(code){
        return await this.$post(CONFIG.API.PROMOTION.CREATEPRO,code)
    }

    async getSlides(){
        return await this.$get(CONFIG.API.PROMOTION.GETSLIDES);
    }
}
