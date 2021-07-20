import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  back(){
    this.router.navigate(['main-menu']);
  }
  goToCoffee(){
    this.router.navigate(['coffeebooking']);
  }
  goToGame(){
    this.router.navigate(['gamebooking']);
  }
  goToBuffet(){
    this.router.navigate(['buffetbooking']);
  }
  gotoCombo(){
    this.router.navigate(['booking-combo']);
  }
}
