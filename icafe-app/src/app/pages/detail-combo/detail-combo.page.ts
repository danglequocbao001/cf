import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from 'src/app/@core-app';

@Component({
  selector: 'app-detail-combo',
  templateUrl: './detail-combo.page.html',
  styleUrls: ['./detail-combo.page.scss'],
})
export class DetailComboPage implements OnInit {

  constructor(private router: Router, private bookingservice: BookingService) { }
  detaiBooking;
  ngOnInit() {
    this.bookingservice.getBooking().subscribe(data =>{
      this.detaiBooking = data;
      // console.log(data);
    })
  }
  back(){
    this.bookingservice.clear();
    this.router.navigate(['booking-combo']);
  }
  accept(){
    this.bookingservice.clear();
    this.router.navigate(['booking-combo']);
  }
}
