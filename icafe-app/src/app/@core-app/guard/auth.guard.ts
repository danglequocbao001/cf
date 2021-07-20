import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService, UserSerivce } from '..';
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    public userInfo: any;
    constructor(private authService: AuthService, private route: Router, private userService: UserSerivce) { }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        if (this.authService.isAuthenticated()) {
            this.userService.getInfoUser().then(
                (res) => {
                    this.userInfo = res;
                    this.authService.decode.next(res);
                },
                (err) =>{
                    console.log(err);
                }
            )
            return true;
        } else {
            this.route.navigate(['auth/login']);
            return false;
        }

    }
}
