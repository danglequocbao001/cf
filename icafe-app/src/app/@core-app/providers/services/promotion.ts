import { Injectable, Injector } from "@angular/core";
import { HttpService } from "./http.service";
import { Storage } from '@ionic/storage';
import { CONFIG } from '../../constants';
@Injectable()
export class PromotionService extends HttpService {
    
    constructor(
        inject: Injector,
        private storage: Storage
    ) {
        super(inject);
    }
  
}
