import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserSerivce } from './user.service';

@Injectable()
export class StorageService {
    private accountSub: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(
        private userService: UserSerivce
    ) { }

    public clear() {
        this.accountSub.next(null);
    }

    public get AccountInfo(): Observable<any> {
        return this.accountSub.asObservable();
    }

    public setInfoAccount(token?) {
        if(token) {
            this.userService.getInfoUser(token).then((data: any) => {
                this.accountSub.next(data);
            })
        } else {
            this.userService.getInfoUser().then((data: any) => {
                this.accountSub.next(data);
            })
        }

        // this.userService.getInfoUser().then((data: any) => {
        //     console.log("check");
            
        //     console.log(data, 'data');
        //     this.accountSub.next(data);
        // });
    }
}
