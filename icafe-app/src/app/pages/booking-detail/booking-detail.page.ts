import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService, PromotionSerivce, OrderService, ProductSerivce, BookingService } from 'src/app/@core-app';
import { ToastController,ModalController  } from '@ionic/angular';
import { ModelBookingPage } from '../model-booking/model-booking.page';

interface Booking{
  booking:{
    book_type: string;
    chekin_datetime: string;
    service_type_id: number;
    amount: number;
    hourstay: number;
    note: string;
  }
}
@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.page.html',
  styleUrls: ['./booking-detail.page.scss'],
})
export class BookingDetailPage implements OnInit {
  public dataItem = [];
  code;
  public booking: Booking;
  public dataAccount: any;
  public dataPromotion: any = {
    promotion_code: '',
    products: []
  }
  // tempTotalPrice = 0;
  totalPrice = 0;
  ship = 15000;
  note: string;
  checkAmount = 0;
  constructor(private router: Router,
    private productservice: ProductSerivce,
    private storageService: StorageService,
    private promotionservice: PromotionSerivce,
    private orderservice: OrderService,
    public toastController: ToastController,
    public modalController: ModalController,
    private bookingservice: BookingService
  ) { 
    this.bookingservice.getBooking().subscribe(data=>{
      this.booking = data.booking;
      this.checkAmount = data.booking.amount;
    })
  }
  ngOnInit() {
    this.storageService.AccountInfo.subscribe((data: any) => {
      this.dataAccount = data;
    });

    this.applyPromotion();
  }

  ionViewWillEnter(){
   
  }
  // async presentToast(message: string) {
  //   const toast = await this.toastController.create({
  //     message: message,
  //     duration: 2000
  //   });
  //   toast.present();
  // }
  
  async presentModal() {
    const modal = await this.modalController.create({
      component: ModelBookingPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
  back() {
    // if(this.booking.booking.book_type ==='coffee'){
    //   this.router.navigate(['coffeebooking']);
    // }if(this.booking.booking.book_type ==='game'){
    //   this.router.navigate(['gamebooking']);
    // }if(this.booking.booking.book_type ==='buffet'){
    //   this.router.navigate(['buffetbooking']);
    // }
    this.router.navigate(['booking']);
  }
  applyPromotion() {
    
    this.dataPromotion.promotion_code = this.code;  
    // this.tempTotalPrice += this.booking.booking.amount;
    this.totalPrice += this.ship * this.checkAmount;
    // console.log('price: ', this.totalPrice);
  }
  addMore() {
    this.router.navigateByUrl('/booking');
  }
  order(){
    this.bookingservice.createbooking(this.booking);
    this.router.navigate(['booking-success']);
  }

  async bookSuccess() {
    const toast = await this.toastController.create({
      message: 'Đặt chỗ thành công!',
      color: "success",
      duration: 2000
    });
    toast.present();
  }
}
