import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController  } from '@ionic/angular';
import { AuthService, HttpService, StorageService, UserSerivce } from 'src/app/@core-app';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  toSend = {
    email: ''
  }
  toCheck = {
    email: this.toSend.email,
    code: ''
  }

  toResetPassword = {
    password: ''
  }

  toConfirmPassword = '';

  checkToken = '';
  Authorization = '';
  headers: any = {};

  sendString = 'Gửi mã OTP';
  time = 30;

  checkChangePassword = true;
  checkSendCode = false;
  
  constructor(private router: Router, 
    private userService: UserSerivce, 
    private toastController: ToastController, 
    private htttpService: HttpService,
    private loadingController: LoadingController,
    private authService: AuthService,
    private storageService: StorageService) { }

  ngOnInit() {
    
  }
  
  getEmailToSend(event) {
    this.toSend.email = event.target.value;
  }

  getEmailToCheck(event) {
    this.toCheck.email = event.target.value;
  }

  getCode(event) {
    this.toCheck.code = event.target.value;
  }

  getNewPassword(event) {
    this.toResetPassword.password = event.target.value;
    // console.log(this.toResetPassword.password);
  }
  getConfirmPassword(event) {
    this.toConfirmPassword = event.target.value;
    // console.log(this.toConfirmPassword);
  }

  sendCode() {
    this.waitForMe('Chờ một xíu...');
    this.userService.sendCode(this.toSend).then(data =>{
      this.checkTimeSendOTP();
      this.presentToast('Đã gửi mã, hãy kiểm tra email!');
    }).catch((err) => {
      this.presentToast('Email không tồn tại!');
    })
  }

  checkCode() {
    this.waitForMe('Chờ một xíu...');
    this.userService.checkCode(this.toCheck).then(data =>{
      this.checkToken = data.token;
      console.log('token: ', data);
      this.userService.setInfoChangePassword(data.token);
      this.checkChangePassword = false;
      this.presentToast('Hãy đặt mật khẩu mới cho tài khoản của bạn!');
      this.toCheck.email = '';
      this.toCheck.code = null;
    }).catch(() => {
      this.presentToast('Lỗi, hãy kiểm tra lại');
    })
  }

  changePassword() {
    this.waitForMe('Chờ một xíu...');
    if(this.toResetPassword.password == this.toConfirmPassword) {
      this.userService.resetPassword(this.toResetPassword, ).then(data =>{
        // console.log('password: ', data);
        this.presentToast('Thành công, hãy đăng nhập và trải nghiệm!');
        this.router.navigateByUrl('/auth/login');
      }).catch(() => {
        this.presentToast('Lỗi, hãy kiểm tra lại');
      })
    }
    else {
      this.presentToast('Mật khẩu xác nhận không trùng khớp!');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  checkTimeSendOTP() {
    const checkTimeOTP = setInterval( () => {
      if(this.time > 0) {
        this.checkSendCode = true;
        this.time--;
        this.sendString = 'Gửi lại mã OTP (sau ' + this.time +'s)';
      }
      if(this.time == 0) {
        this.sendString = 'Gửi mã OTP';
        this.checkSendCode = false;
        this.time = 30;
        clearInterval(checkTimeOTP);
      }
    }, 1000);
  }
  disable = false;
  async waitForMe(mess: string) {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: mess,
      duration: 1000,
    });
    await loading.present();
    this.disable = true;
  }

  back(){
    this.checkChangePassword = true;
    this.router.navigateByUrl('/auth/login')
  }
}
