import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { ProductSerivce } from 'src/app/@core-app';
import { ToppingService } from 'src/app/@core-app';

@Component({
  selector: 'app-change-product-amount',
  templateUrl: './change-product-amount.component.html',
  styleUrls: ['./change-product-amount.component.scss'],
})
export class ChangeProductAmountComponent implements OnInit {
  id:any;
  product:any;
  updatePrice: number = 0;
  updatevalue: number = 1;
  arrayToppings: any;
  selectedTopping; 
  selectedTopping_str: string = '';
  priceTopping:number = 0;
  preValue: any;
  selectedTopping_obj:any =[];
  constructor(private modalController: ModalController,
    private navParam: NavParams, 
    private productservice: ProductSerivce,
    private toppingservice: ToppingService, 
    private router: Router,
    public navCtrl: NavController) { 
    }

  ngOnInit() {
    this.product = this.navParam.get('data');
    this.preValue =  {...this.product};
    this.updatePrice = this.product.total_price;
    this.updatevalue = this.product.amount;
    this.selectedTopping = this.product.topping_arr;
    this.arrayToppings =  this.product.toppings;
  }
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  add(){
    this.updatevalue++;
    this.updateTopping();
    this.updatePrice = this.calPrice();
  }
  minus(){
    if(this.updatevalue > 0){
      this.updatevalue--;
      this.updateTopping();
      this.updatePrice = this.calPrice();
    }
  }

  updateTopping(){
    if(this.selectedTopping){
      let check = 0;
      this.selectedTopping.forEach(element => {
        this.arrayToppings.forEach(topping => {
          if(element === topping.id) check += topping.price;
        });
      });
      if(check != this.priceTopping){
        this.priceTopping = check;
      }
      this.updatePrice = this.calPrice();
    }
  }
  
  confirm(){
    if(this.selectedTopping != null){
      for (let i = 0; i < this.selectedTopping.length; i++) {
        const element = this.selectedTopping[i];
        if(i == this.selectedTopping.length - 1){
          this.selectedTopping_str += element;
          break;  
        }
        this.selectedTopping_str += (element + '_');
      }
    }
    if(this.selectedTopping != null){
      this.selectedTopping.forEach(topping => {
        this.arrayToppings.forEach(element => {
          if(topping === element.id) this.selectedTopping_obj.push(element); 
        });
      });
    }
    this.product['amount'] = this.updatevalue;
    this.product['topping_ids'] = this.selectedTopping_str;
    this.product['topping_arr'] = this.selectedTopping;
    this.product['total_price'] = this.updatePrice;
    this.product['topping_obj'] = this.selectedTopping_obj;
    
    this.productservice.updateOrder(this.product, this.preValue);
    this.dismiss();
    this.router.navigate(['/item-detail']);
  }
  calPrice(){
    return (this.product.price * this.updatevalue) + (this.priceTopping * this.updatevalue);
  }
}