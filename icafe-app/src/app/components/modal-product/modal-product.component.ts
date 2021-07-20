import { Component, Input,OnInit,  Output, EventEmitter  } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ProductSerivce } from 'src/app/@core-app';
import { ToppingService } from 'src/app/@core-app/providers/services/topping.service';
import { FormsModule } from '@angular/forms';
import { stringify } from '@angular/compiler/src/util';
import { fromEventPattern } from 'rxjs';

interface Topping{
  id: number,
  name: string,
  price: number
}

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.scss'],
})
export class ModalProductComponent implements OnInit {
  id:any;
  product:any;
  updatePrice: number = 0;
  arrayProducts:any = [];
  
  // Topping
  selectedTopping;
  selectedTopping_str: string = ``;
  selectedTopping_obj: any = [];
  arrayToppings:Topping[];
  priceTopping = 0;
  constructor(private navParam: NavParams,
    private modalController: ModalController,
    private productservice: ProductSerivce,
    private toppingservice: ToppingService
    ){}
     
  updatevalue: number = 1;
  @Input() checked: Boolean = false;
  ngOnInit() {
    this.id = this.navParam.get('data');
    this.productservice.getFoodById(this.id).then((data)=>{
      let arrCheckCurrentProduct = this.productservice.shopCart();
      arrCheckCurrentProduct = arrCheckCurrentProduct.find(item => item.id === data.product.id) || [{amount: 1}];
      this.product = data.product;
      
      if(this.product.product_image == null){
        this.product.product_image = 'assets/images/meal.png';
      }
      this.updatePrice = data.product.price * arrCheckCurrentProduct.amount || data.product.price;
      this.updatevalue = arrCheckCurrentProduct.amount || 1;
    })
    this.toppingservice.getProductTopping(this.id).then(data=>{
      this.arrayToppings = data.toppings;
    })
  }
  
  // close modal
  add(){
    this.updatevalue++;
    this.updatePrice = this.calPrice();
  }
  minus(){
    if(this.updatevalue > 1){
      this.updatevalue--;
      this.updatePrice = this.calPrice();
    }
   
  }
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  addProduct(){
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
    this.product['total_price'] = this.updatePrice;
    this.product['topping_arr'] = this.selectedTopping;
    this.product['topping_obj'] = this.selectedTopping_obj;
    this.productservice.setOrder(this.product);
    this.dismiss();
  }
  updateTopping(){
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
  
  calPrice(){
    return (this.product.price * this.updatevalue) + (this.priceTopping * this.updatevalue);
  }
}