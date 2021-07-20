import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PromotionSerivce } from 'src/app/@core-app';

@Component({
  selector: 'app-promotion-detail',
  templateUrl: './promotion-detail.page.html',
  styleUrls: ['./promotion-detail.page.scss'],
})
export class PromotionDetailPage implements OnInit {
  getData:any;
  code : '';
  constructor(
    private promotionService: PromotionSerivce,
    private router: Router
  ) { this.getPromotionByCode(); }

  ngOnInit() {
    
  }

  getPromotionByCode() {
    this.code = JSON.parse(localStorage.getItem("codePromotion"));
    this.promotionService.getPromotionByCode(this.code).then((data) => {
      this.getData = data;
      console.log('getData: ',this.getData);
    })
  }
  back() {
    this.router.navigate(['main-menu']);
  }

}

// this.products.forEach(product => {
//   if (product.product_image == null) {
//     product.product_image = 'assets/images/meal.png';
//   }
// });