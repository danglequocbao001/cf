import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.page.html',
  styleUrls: ['./payment-method.page.scss'],
})
export class PaymentMethodPage implements OnInit {

  checkPayment = 'MoMo';

  constructor( private router: Router, private toastController: ToastController) { }

  ngOnInit() {
  }

  back() {
    this.router.navigate(['detail-user']);
  }

  byMoMo() {
    this.checkPayment = 'MoMo';
    // console.log(this.checkPayment);
  }

  byCash() {
    this.checkPayment = 'Tiền mặt';
    // console.log(this.checkPayment);
  }

  changePaymentData() {
    // this.checkPayment = JSON.parse(localStorage.getItem("paymentData"));
    localStorage.setItem("paymentData", JSON.stringify(this.checkPayment));
    let paymentData = JSON.parse(localStorage.getItem("paymentData"));
    // console.log('changeData: ' ,dataToChange);
    this.changePaymentSuccess();
  }

  async changePaymentSuccess() {
    const toast = await this.toastController.create({
      message: 'Thành công, đơn hàng của bạn sẽ được thanh toán bằng ' + this.checkPayment,
      color: 'success',
      duration: 2000
    });
    toast.present();
  }
}
