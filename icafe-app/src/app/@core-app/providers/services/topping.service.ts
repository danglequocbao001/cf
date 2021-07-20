import { Injectable, Injector} from '@angular/core';
import { HttpService } from './http.service';
import { from } from 'rxjs';
import { inject } from '@angular/core/testing';

@Injectable()
export class ToppingService extends HttpService {
    constructor(inject: Injector){
        super(inject);
    }
    async getProductTopping(id: number){
        return await this.$get(`/products/${id}/topping`);
    }
}