import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UserSerivce } from 'src/app/@core-app';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.page.html',
    styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
    formGroup: FormGroup;
    isCheckShowSuccess: boolean = false;
    constructor(private userService: UserSerivce, private fb: FormBuilder, private router: Router, private navCtrl: NavController) { }

    ngOnInit() {
        this.createForm();
    }

    createForm(){
        this.formGroup = this.fb.group({
            password_confirmation: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
            current_password: new FormControl('', [Validators.required])
        })
    }

    changePassword() {
        let data = {
            user : this.formGroup.value
        }
        this.userService.editPassword(data).then(
            (res) => {
                this.router.navigate(['main-menu']);
            }
        ).catch((error) => {
            // console.log(error)
        })
    }

    backPage(){
        this.navCtrl.pop();
    }
}
