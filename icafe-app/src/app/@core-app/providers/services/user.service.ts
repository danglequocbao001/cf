import { Injectable, Injector } from "@angular/core";
import { HttpService } from "./http.service";
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { HttpHeaders } from "@angular/common/http";
import { CONFIG } from "../../constants";

@Injectable()
export class UserSerivce extends HttpService {

    private accountSub: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    httpOptions: any;
    constructor(
        inject: Injector,
        private storage: Storage
    ) {
        super(inject);
    }

    editUser(request){
        return this.$patch('/update_profile', request);
    }

    editPassword(request){
        return this.$put('/update_password', request);
    }
    
    async getInfoUser(token?){
        if(token) {
            const httpOptions = {headers: new HttpHeaders({Authorization: token})}
            return await this.$get('/user_profile',{},httpOptions);
        } else {
            return await this.$get('/user_profile');
        }
    }
    uploadphoto(request){
        return this.$post('/upload_photo', request);
    }



    sendCode(request){
        return this.$post(CONFIG.API.USER.SEND_CODE, request);
    }
    checkCode(request){
        return this.$post(CONFIG.API.USER.CHECK_CODE, request);
    }
    resetPassword(request){
        // console.log(this.httpOptions, 'this.httpOptions');
        
        return this.$post(CONFIG.API.USER.RESET_PASSWORD, request, this.httpOptions);
    }
    saveData(data: any) {
        this.storage.set("Authorization", data.token);
        localStorage.setItem('Authorization', data.token);
    }
    public setInfoChangePassword(token?) {
        // console.log(token, 'token1');
        if(token) {
            this.httpOptions = {headers: new HttpHeaders({Authorization: token})}
            this.getInfoChangePassword(token).then((data: any) => {
                this.accountSub.next(data);
            })
        }
    }
    async getInfoChangePassword(token?){
        return await this.$post(CONFIG.API.USER.RESET_PASSWORD,{}, this.httpOptions);
    }
}

