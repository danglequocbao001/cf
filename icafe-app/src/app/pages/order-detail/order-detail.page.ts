import { Component, OnInit } from '@angular/core';
import { OrderHistoryService } from 'src/app/@core-app/providers/services/order-history.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/@core-app/providers/services/order.service';
import { ElementSchemaRegistry } from '@angular/compiler';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {

  data:any;  

  constructor(
    private orderHistoryService: OrderHistoryService,
    private router: Router,
    private storage: Storage,
    private orderservice: OrderService,
  ) {
    
  }
  
  ngOnInit() {
    this.orderHistoryService.getOrderByID(localStorage.getItem('orderID')).then(data => {
      this.data = data.order;
      console.log(this.data);
    });
  }
  back(){
    this.router.navigateByUrl('detail-user/order-history');
  }
  deleteOrder(){
    this.orderservice.deleteOrder(localStorage.getItem('orderID'));
    this.back();
  }
  deleteAllOrder(){
    this.orderHistoryService.getOrdersHistory().then(data => {
      data.data.forEach(element => {
        if(element.status == "pending") this.orderservice.deleteOrder(element.id);
      });
    })
    this.back();
  }
}
