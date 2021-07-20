import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/@core-app/providers/services/payment.service';
import { BookingService, AuthService } from 'src/app/@core-app';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GamebookingPageRoutingModule } from '../gamebooking/gamebooking-routing.module';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  totalPrice;
  datainfo;
  constructor(
    private paymentservice: PaymentService,
    private bookingservice: BookingService,
    private route: ActivatedRoute,
    private authservice: AuthService,
    private router: Router
    ) {
      this.datainfo = this.authservice.info();
      // console.log('datainfo',this.datainfo);
     }

  ngOnInit() {
    this.route.queryParams.subscribe((params)=>{
      this.totalPrice = JSON.parse(params["data"]);
    })
  }
  useMomo(price: number){
    const data = {
      order_id: Math.random(),
      // app_link:"https://developer.android.com/training/app-links",
      app_link: "google.com",
      amount: this.totalPrice,
      order_info: "Thanh toán cho đơn hàng"
    }
    this.paymentservice.momoPayment(data).then(data =>{
      window.open(data.pay_url, "_system");
    })
  }
  back(){
    this.router.navigateByUrl("/item-detail");
  }
}
