import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-success',
  templateUrl: './booking-success.page.html',
  styleUrls: ['./booking-success.page.scss'],
})
export class BookingSuccessPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  gotoMenu(){
    this.router.navigate(['main-menu']);
  }
}
