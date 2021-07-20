import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductSerivce, StorageService, PromotionSerivce, OrderService, BookingService, PaymentService, AuthService } from 'src/app/@core-app';

import { LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { ChangeProductAmountComponent } from 'src/app/components/change-product-amount/change-product-amount.component';

import { ShoppingCartService } from 'src/app/@core-app/providers/services/shopping-cart.service';
import { PaymentPage } from '../payment/payment.page';
import { formatPercent } from '@angular/common';
import { GoogleMapSearchComponent } from 'src/app/components/google-map-search/google-map-search.component';
import { OrderLocationService } from 'src/app/@core-app/providers/services/order-location.service';

@Component({
  selector: 'app-item-detail',
  // providers: [PaymentService2],
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
})
export class ItemDetailPage implements OnInit {
  isEditUser: boolean = false;
  isAddDetailLocation: boolean = false;  
  paymentType = 'MoMo';
  totalOrder = {
    amount: 0,
    totalPrice: 0
  };
  public dataItem = [];
  code;
  public dataAccount: any;
  public dataOrder: any = {
    long: '',
    lat: '',
    note: '',
    full_address: '',
    distance:'',
    shipCost:'',
    order_details_attributes: [],
    phone_number_reciver: '',
  };
  public dataPromotion: any = {
    promotion_code: '',
    products: []
  }
  tempTotalPrice:number = 0;
  totalPrice:number = 0;
  productPrice:number = 0;
  dataById:any;
  getOrderId = 0;
  detailLocation: string;
  datainfo;
  momo = 'MoMo';
  cash = 'Tiền mặt';
  types=[
    {name: 'MoMo'},
    {name: 'Tiền mặt'}
  ]
  
  phoneNumberReciver:string = '';
  
  arrayTopping: any;
  
  constructor(private router: Router,
    private productservice: ProductSerivce,
    private storageService: StorageService,
    private promotionservice: PromotionSerivce,
    private orderservice: OrderService,
    public toastController: ToastController,
    private bookingservice: BookingService,
    public modalController: ModalController,
    private shoppingcartservice: ShoppingCartService,
    private payment: PaymentPage,
    private paymentService: PaymentService,
    private authservice: AuthService,
    private route: ActivatedRoute,
    private paymentservice: PaymentService,
    private loadingController: LoadingController,
    private orderLocationService: OrderLocationService
    // private paymentService2: PaymentService2
    ) { 
      this.datainfo = this.authservice.info();
    }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message, 
      duration: 2000
    });
    toast.present();
  }
  ngOnInit() {
    console.log("paymentData", this.paymentType);
    
    this.bookingservice.getBooking().subscribe(data =>{
      this.dataOrder.lat = data.lat;
      this.dataOrder.long = data.long;
      this.dataOrder.full_address = data.full_address;
    });

    this.shoppingcartservice.getShipCost().subscribe(data=>{
      this.dataOrder.distance = data.distance;
      this.dataOrder.shipCost = data.cost;
    })
    const dataTemp = this.productservice.shopCart();
    this.dataItem = dataTemp.filter(order => order.amount > 0);
    this.storageService.AccountInfo.subscribe((data: any) => {
      this.dataAccount = data;
    });

    this.caculatorOrder();

    this.getOrderTotal();

    // this.route.queryParams.subscribe((params)=>{
    //   this.totalPrice = JSON.parse(params["data"]);
    // })
    // if(localStorage.getItem("paymentData") == null){
    //   this.paymentType.name = this.momo;
    // }
    // else this.paymentType = localStorage.getItem("paymentData"); 
  }
  typeProduct = this.orderservice.getPreviousOrder();

  checkOrderPaymentAndOrder() {
    this.dataOrder.phone_number_reciver = "+84" + this.phoneNumberReciver.toString().slice(1, this.phoneNumberReciver.toString().length);

    if(this.paymentType == 'MoMo') {
      this.orderservice.createorder(this.dataOrder).then((data) => {
        this.getOrderId = data.order.id;
        this.presentToast('Đặt món thành công');
        setTimeout(()=> {
          this.waitForMomo();
          this.useMomo();
        },0);
      }).catch((err) => {
        this.presentToast(err.error.message);
        this.router.navigateByUrl('/product');
        this.productservice.clearCart();
      })
    }
    
    if(this.paymentType == 'Tiền mặt') {
      this.payChecker();
      if(this.totalPrice <= 500000 && this.amounts <= 10) {
        this.orderservice.createorder(this.dataOrder).then((data) => {
          this.getOrderId = data.order.id;
          this.presentToast('Đặt món thành công');
          this.router.navigateByUrl('/detail-user/order-history');
          setTimeout(()=> {
            this.useCash();
          },0);
        }).catch((err) => {
          this.presentToast(err.error.message);
          this.router.navigateByUrl('/product');
          this.productservice.clearCart();
        })
      }
    }
  }

  useMomo(){
    const data = {
      order_id: Math.random(),
      // app_link:"https://developer.android.com/training/app-links",
      app_link: "google.com",
      amount: this.totalPrice,
      order_info: "Thanh toán cho đơn hàng"
    }
    console.log("momo data: ", data);
    // console.log('send_data: ', data);
    this.paymentservice.momoPayment(data).then(data =>{
      console.log("momo data: ", data);
      window.open(data.pay_url, "_system");
    })
  }

  useCash() {
    setTimeout(() => {
      // console.log(this.getOrderId);
      const checkPayment = {
        id : this.getOrderId,
        type : "cash"
      }
      // console.log('checkPayment: ',checkPayment);
      this.paymentService.cashPayment(checkPayment).then(data =>{
        // console.log(data);
      })
    }, 1000); 
  }

  amounts:number = 0;
  caculatorOrder() {
    this.tempTotalPrice = 0;
    this.totalPrice = 0;
    for (const item of this.dataItem) {
      this.dataOrder.order_details_attributes.push({
        product_id: item.id,
        amount: item.amount,
        topping_ids: item.topping_ids
      });
      
      this.dataPromotion.products.push({
        product_id: item.id,
        amount: item.amount,
      })
      let toppingPrice = 0;
      item.topping_obj.forEach(element => {
        toppingPrice += element.price;
      });
      this.productPrice += (item.amount * item.price + toppingPrice);
      // console.log(this.productPrice,'productPrice');
      this.tempTotalPrice += (item.amount * item.price + toppingPrice);
      this.amounts = item.amount;
    }
    this.totalPrice = this.tempTotalPrice + this.dataOrder.shipCost;
  }

  applyPromotion() {
    this.dataPromotion.promotion_code = this.code;
    this.productservice
    this.totalPrice = this.tempTotalPrice;
  }
  addMore() {
    this.orderLocationService.setLocationOrder(this.dataOrder);
    this.router.navigateByUrl('/product');
  }

  async payChecker() {
    if(this.totalPrice > 500000 || this.amounts > 10) {
      const toast = await this.toastController.create({
        message: 'Bạn không thể thanh toán đơn hàng này bằng tiền mặt, hãy dùng MoMo nhé!',
        color: 'warning',
        duration: 5000,
      });
      toast.present();
    }
    this.router.navigate(['/item-detail']);
  }

  async popupModalChange(index: number) {
    this.router.navigate(['/product']);
    this.dataById = this.productservice.shopCart()[index];
    console.log(this.dataById, 'idDAta');
    
    const modal = await this.modalController.create({
      component: ChangeProductAmountComponent,
      cssClass: 'custom-modal', componentProps: {data: this.dataById}
    });

    
    return await modal.present();
    
  }
  getOrderTotal() {
    this.productservice.getchosseFoodList.subscribe((data: any) => {
      const dataTemp = this.productservice.totalInfoShopCart();
      this.totalOrder.amount = dataTemp.totalAmount || 0;
      this.totalOrder.totalPrice = dataTemp.totalPrice || 0;
    })
  }

  dynChangePaymentMethod() {
    if(this.paymentType == this.momo) {
      localStorage.setItem("paymentData", JSON.stringify(this.cash));
      // this.paymentType = JSON.parse(localStorage.getItem("paymentData"));
    }
    if(this.paymentType == this.cash) {
      localStorage.setItem("paymentData", JSON.stringify(this.momo));
      
    }
    this.paymentType = JSON.parse(localStorage.getItem("paymentData"));
    this.changePaymentSuccess();
  }
  async changePaymentSuccess() {
    const toast = await this.toastController.create({
      message: 'Thành công, đơn hàng của bạn sẽ được thanh toán bằng ' + this.paymentType,
      color: 'success',
      duration: 2000
    });
    toast.present();
  }

  async waitForMomo() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Đang xử lý...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
  editPhoneNumber() {
    this.isEditUser = true;
  }
  addDetail(){
    this.isAddDetailLocation = true;
  }
  
  async popupGoogleMap(){
    const modal = await this.modalController.create({
      component: GoogleMapSearchComponent,
      cssClass: 'map-modal'
    })
    modal.onDidDismiss().then((data)=>{
      const rs = data['data'];
      this.dataOrder.full_address = rs.address;
      this.dataOrder.lat = rs.lat;
      this.dataOrder.long = rs.lng;
      this.dataOrder.distance = rs.distance;
      this.dataOrder.shipCost = rs.cost;
      
      this.caculatorOrder();
    })
    return await modal.present();
  }
  back() {
    this.orderLocationService.setLocationOrder(this.dataOrder);
    this.router.navigate(['/product'], {queryParams: {typeProduct:this}});
  }
  deleteOrder(index: number){
    this.dataItem.splice(index, 1);
    this.productservice.deleteOrder(index);
    this.caculatorOrder();
  }
}