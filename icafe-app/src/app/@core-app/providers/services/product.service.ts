import { Injectable, Injector } from "@angular/core";
import { HttpService } from "./http.service";
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { isUndefined } from 'util';
@Injectable()
export class ProductSerivce extends HttpService {
    public testsubject: Subject<any> = new Subject<any>();
    // public totalOrderSubject: Subject<any> = new Subject<any>();
    private totalOrderSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    tt=0;
    constructor(
        inject: Injector,
        private storage: Storage
    ) {
        super(inject);
    }
    clearCart(){
        localStorage.removeItem('shopCart');
    }
    shopCart() {
        return JSON.parse(localStorage.getItem('shopCart')) || [];
    }

    get getchosseFoodList() {
        return this.totalOrderSubject.asObservable();
    }
    CountOder(){
        this.tt = 0;
    }
    setOrder(food){
        const DetailchosseFoodList = (localStorage.getItem('shopCart')) ? JSON.parse(localStorage.getItem('shopCart')) : [];
        const checkDuplicate = DetailchosseFoodList.find(item => item.id === food.id && item.topping_ids === food.topping_ids)
        if(checkDuplicate) {
            for(let item of DetailchosseFoodList) {
                if(item.id === food.id) {
                    item.amount += food.amount;
                    item.total_price += food.total_price;
                }
            }
        } else {
            DetailchosseFoodList.push(food);
        }
        // console.log(orderTopping);
        
        localStorage.setItem('shopCart', JSON.stringify(DetailchosseFoodList));
        this.totalOrderSubject.next(DetailchosseFoodList);
    }
    updateOrder(food, preValue){
        let preOrder = localStorage.getItem('shopCart') ? JSON.parse(localStorage.getItem('shopCart')): [];
        let index = preOrder.findIndex(item => item.id === preValue.id && item.topping_ids === preValue.topping_ids);
        if(food.amount == 0){
            preOrder.splice(index, 1);
            localStorage.setItem('shopCart', JSON.stringify(preOrder));
            this.totalOrderSubject.next(preOrder);
        }
        else{
            preOrder[index] = food;
            localStorage.setItem('shopCart', JSON.stringify(preOrder));
            this.totalOrderSubject.next(preOrder);
        }
    }
    deleteOrder(index:number){
        let preOrder = localStorage.getItem('shopCart') ? JSON.parse(localStorage.getItem('shopCart')): [];
        preOrder.splice(index, 1);
        localStorage.setItem('shopCart', JSON.stringify(preOrder));
    }
    totalInfoShopCart() {
        const listProduct = this.shopCart() || [];
        const result = {
            totalAmount: 0,
            totalPrice: 0
        }
        for(const item of listProduct) {
            let toppingPrice = 0;
            item.topping_obj.forEach(element => {
                toppingPrice += element.price;
            });
            
            result.totalPrice += item.price * item.amount + toppingPrice;
            result.totalAmount += item.amount;
        }
        return result;
    }
    async getFood(pageProduct: any){
        return await this.$get('/products', pageProduct);
    }
    // async getFood(){
    //     return await this.$get('/products?product_type=food');
    // }
    async getDrink(){
        return await this.$get('/products?product_type=drink');
    }
    async getSnack(){
        return await this.$get('/products?product_type=snack');
    }
    async getFoodById(id){
        return await this.$get(`/products/${id}`);
    }
    async getOrderHistory(){
        return await this.$get(`/orders/order_history`);
    }

    async getSearchTerm(search) {
        return await this.$get(`/products?name=${search}`);
    }
}
