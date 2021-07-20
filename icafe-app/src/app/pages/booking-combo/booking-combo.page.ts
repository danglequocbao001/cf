import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from 'src/app/@core-app';

@Component({
  selector: 'app-booking-combo',
  templateUrl: './booking-combo.page.html',
  styleUrls: ['./booking-combo.page.scss'],
})
export class BookingComboPage implements OnInit {
  combos = [
    {
      combo:'GÓI 1',
      capacity:'Dành cho 10 người',
      price:'Giá 1000.000 vnđ'
    },
    {
      combo:'GÓI 2',
      capacity:'Dành cho 6 người',
      price:'Giá 300.000 vnđ'
    },
    {
      combo:'GÓI 3',
      capacity:'Dành cho 4 người',
      price:'Giá 200.000 vnđ'
    },
    {
      combo:'GÓI 4',
      capacity:'Dành cho 2 người',
      price:'Giá 100.000 vnđ'
    }
  ]
  constructor(private router: Router, private bookingservice: BookingService) { }
  gotoDetail(combo){
    this.bookingservice.setBooking(combo);
    this.router.navigate(['detail-combo']);
  }
  back(){
    this.router.navigate(['booking']);
  }
  ngOnInit() {
  }

}
