import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BookingService } from 'src/app/@core-app';
import { Router } from '@angular/router';
@Component({
  selector: 'app-buffetbooking',
  templateUrl: './buffetbooking.page.html',
  styleUrls: ['./buffetbooking.page.scss'],
})
export class BuffetbookingPage implements OnInit {
  floors = [
    {
      floor:'Bàn gia đình',
      id:1,
    },
    {
      floor:'Bàn một mình',
      id:2,
    },
  ]
  longtime = [
    {
      time:'1 tiếng'
    },
    {
      time:'2 tiếng'
    },
    {
      time:'3 tiếng'
    },
    {
      time:'4 tiếng'
    },
  ]
  number: number;
  date: string;
  time: string;
  flagdate: string;
  flagtime:string;
  datetime: string;
  type: string;
  hourstay: string;
  constructor(private router: Router,private bookingservice: BookingService) {
   }


  ngOnInit() {
    
  }
  gotodetail(){
    this.flagdate = moment(this.date).format('DD-MM-YYYY');
    this.flagtime = moment(this.time).format('HH:mm');
    this.datetime = this.flagdate+','+this.flagtime;
    const data:any = {
        booking: {
          book_type: "buffet",
          checkin_datetime:this.datetime,
          service_type: this.type,
          amount: this.number,
          hour_stay: this.hourstay
        }
    }
    this.bookingservice.setBooking(data);
    // this.bookingservice.createbooking()
    this.router.navigate(['booking-detail']);
  }
  back(){
    this.router.navigate(['booking']);
  }

  ngOnchange(){
    this.check();
  }
  check():boolean{
    if(this.type != null && this.number > 0 && this.date != null && this.time != null && this.hourstay != null){
      return false;
    }
    else return true;
  }
}
