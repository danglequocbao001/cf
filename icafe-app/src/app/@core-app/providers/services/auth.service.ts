

import { Injectable, Injector } from "@angular/core";
import { HttpService } from "./http.service";
import { Storage } from '@ionic/storage';
import { BehaviorSubject,Subject } from 'rxjs';
import { CONFIG } from '../../constants';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
@Injectable()
export class AuthService extends HttpService {
    public decode = new BehaviorSubject<any>({});
    public _checkLogin: Subject<Boolean> = new Subject<Boolean>();
    constructor(
        inject: Injector,
        private storage: Storage,
        private storageService: StorageService,
        private router: Router,
    ) {
        super(inject);
    }

    info(){
        return this.decode.asObservable();
    }

    async loginUser(request){
        return await this.$post(CONFIG.API.AUTH.LOGIN, request);
    }

    async registerUser(request){
        return await this.$post(CONFIG.API.AUTH.SIGNUP, request);
    }


    saveData(data: any) {
        this.storage.set("user", data.username);
        this.storage.set("Authorization", data.token);
        localStorage.setItem('Authorization', data.token);
    }
    logout(){
        this.poptoRoot(false);
        localStorage.clear();
    }
    public poptoRoot(value){
        this._checkLogin.next(value);
    }
    isAuthenticated() {
        return localStorage.getItem('Authorization') != null;
    }
}
