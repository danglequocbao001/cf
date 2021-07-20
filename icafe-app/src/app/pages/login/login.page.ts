import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController,ToastController, AlertController  } from '@ionic/angular';
import { AuthService, HttpService, StorageService } from 'src/app/@core-app';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],

})
export class LoginPage implements OnInit {
    loginData:any;
    formGroup: FormGroup;
    isCheckLogin: boolean = false;
    public showSpinner = false;
    constructor(private fb: FormBuilder, 
        private authService: AuthService, private router: Router, 
        public navCtrl: NavController,
        public toastController: ToastController,
        public alertCtrl: AlertController,
        private httpService: HttpService,
        private storageService: StorageService,
        ) { }

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
    async presentToast(message:string) {
        const toast = await this.toastController.create({
          message: message,
          duration: 2000
        });
        toast.present();
      }
    createForm(){
        this.formGroup = this.fb.group({
            line1: new FormControl('', [Validators.required]),
            line2: new FormControl('', [Validators.required])
        })
    }

    validation(){
        if(!this.formGroup.valid){
            this.isCheckLogin = true;
            return false;
        }
        return true;
    }

    login(){
        this.showSpinner = true;
        
        if(this.validation()){
            // ......
            if(parseInt(this.formGroup.value.line1) != NaN && (this.formGroup.value.line1[0] == 0)){
                this.loginData = {
                    phone_number: '+84' + this.formGroup.value.line1.slice(1, this.formGroup.value.line1.length),
                    password: this.formGroup.value.line2
                }
            }
            else this.loginData={
                username: this.formGroup.value.line1,
                password: this.formGroup.value.line2
            };
            

            this.authService.loginUser(this.loginData).then(
                async (res) => {
                    this.authService.saveData(res);
                    // this.httpService.setToken(res.token);
                    this.storageService.setInfoAccount(res.token);
                        // console.log(window.localStorage.getItem('Authorization'));
                    if(window.localStorage.getItem('Authorization')){
                        this.showSpinner = false;
                        this.router.navigate(['main-menu']);
                    }
                }
            ).catch(
                (error) => {
                  this.showSpinner = false;
                   this.presentAlert('Tên đăng nhập hoặc mật khẩu không đúng, vui lòng thử lại!')
                }
            )
        }
    }
    back(){
        this.router.navigateByUrl('/tabs')
    }
    noaccount(){
        this.router.navigate(['auth/register']);  
    }
    forgotPassword() {
        this.router.navigate(['/forgot-password']);
    }
    netWorkCheck(){

    }
}
