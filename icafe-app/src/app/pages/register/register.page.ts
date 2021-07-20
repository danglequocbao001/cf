import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/@core-app';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    formGroup: FormGroup
    public showSpinner = false;
    constructor(private fb: FormBuilder, 
        private router: Router, 
        private authService: AuthService,
        private navCtrl: NavController,
        public alertCtrl: AlertController,) { }

    ngOnInit() {
        this.createForm();
    }
    async presentAlert(text: string) {
        const alert = await this.alertCtrl.create({
          header: 'Cảnh báo',
          message: text,
          buttons: [{
            text:'Đồng ý',
            role:'ok'
          }]
        });
        await alert.present();
      }
    createForm(){
        this.formGroup = this.fb.group({
            phone_number: new FormControl('', [Validators.required]),
            username: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
            password_confirmation: new FormControl('', [Validators.required])
        })
    }

    register(){
        this.showSpinner = true;
        // console.log('aaa');
        if(this.formGroup.valid){
            let convertPhone = this.formGroup.value.phone_number.slice(1,10);
            let defineNumber = "+84";
            let phoneNumber = defineNumber.concat(convertPhone)
            const data = {
                phone_number: phoneNumber,
                username: this.formGroup.value.username.toLowerCase(),
                email: this.formGroup.value.email,
                password: this.formGroup.value.password,
                password_confirmation: this.formGroup.value.password_confirmation
            }
            
            this.authService.registerUser(data).then( 
                (res)=>{
                    this.router.navigate(['auth/register-success']);
                    this.showSpinner = false;
                }
            ).catch(
                (error) =>{
                    this.showSpinner = false;
                    this.presentAlert(error.error.errors[0])
                }
            )
        }
    }
    haveaccount(){
        this.router.navigate(['auth/login']);  
    }
    back(){
        this.router.navigateByUrl('/tabs')
    }
}
