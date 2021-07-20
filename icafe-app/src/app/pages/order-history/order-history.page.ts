import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService, ProductSerivce } from 'src/app/@core-app';
import { Storage } from '@ionic/storage';
import { OrderHistoryService } from 'src/app/@core-app/providers/services/order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.page.html',
  styleUrls: ['./order-history.page.scss'],
})
export class OrderHistoryPage implements OnInit {
  public Tab = 'foodOrder';
  public arrayHistory:any[];
  id:number;
  constructor(
    private productservice: ProductSerivce,
    private router: Router,
    private bookingservice: BookingService,
    private orderHistoryService: OrderHistoryService,
  ) { }

  changeTabs(tabs) {
    this.Tab = tabs;
    if(this.Tab == 'foodOrder'){
      this.getOrderHistory();
    }
    else this.getBookingHistory();
  }

  ngOnInit() {
    this.getOrderHistory();
  }
  ngOnchange() {}
  getOrderHistory(){
    this.productservice.getOrderHistory().then(data =>{
      this.arrayHistory = data.data;
      console.log('array order: ' + JSON.stringify(this.arrayHistory));
    })
  }
  getBookingHistory(){
    this.bookingservice.getBookingHistory().then(data=>{
      this.arrayHistory = data.data;
      console.log(this.arrayHistory);
    })
  }
  async segmentChanged(event:any) {
    this.Tab = event.target.value;
    console.log(this.Tab, '__tab');
    // console.log('Segment changed' + event);
  }
  back(){
    this.router.navigateByUrl("/detail-user");
  }
  gotodetail(id){
    this.orderHistoryService.setID(id);
    console.log(id);
    this.router.navigateByUrl("/order-detail");
  }
}