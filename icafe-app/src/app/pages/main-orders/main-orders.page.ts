import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../@core-app/providers/services/order.service'

@Component({
  selector: 'app-main-orders',
  templateUrl: './main-orders.page.html',
  styleUrls: ['./main-orders.page.scss'],
})
export class MainOrdersPage implements OnInit {
  
  constructor(
    private router: Router,
    private orderservice: OrderService,
    ) { }
    
    ngOnInit() {
    }
    back(){
      this.router.navigate(['/main-menu']);
    }
    getProduct(typeProduct) {
      this.orderservice.setPreviousOrder(typeProduct);
      this.router.navigate(['/product'], {queryParams: {typeProduct}});
  }
}