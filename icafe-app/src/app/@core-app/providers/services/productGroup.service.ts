import { Injectable, Injector } from "@angular/core";
import { HttpService } from "./http.service";
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
@Injectable()
export class ProductGroupSerivce extends HttpService {
    constructor(
        inject: Injector,
        private storage: Storage
    ) {
        super(inject);
    }
    async getDataLists(pageProductGroup){
        return await this.$get(`/product_groups`, pageProductGroup);
    }
}