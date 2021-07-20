import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BookingService } from 'src/app/@core-app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gamebooking',
  templateUrl: './gamebooking.page.html',
  styleUrls: ['./gamebooking.page.scss'],
})
export class GamebookingPage implements OnInit {
  types = [
    {
      floor:'Ghế VIP',
      id:0,
    },
    {
      floor:'Ghế Thường',
      id:1,
    },
    {
      floor:'Ghế Thi Đấu',
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
  type:number;
  hourstay: string;
  typeService: any;
  note: string="";
  constructor(private router: Router,private bookingservice: BookingService) { 
    this.getGameService();
  }

  ngOnInit() {
  }
  gotodetail(){
    this.flagdate = moment(this.date).format('DD-MM-YYYY');
    this.flagtime = moment(Date.now()).format('HH:mm');;
    this.datetime = this.flagdate+','+this.flagtime;
    const data:any = {
        booking:{
          book_type: this.typeService[this.type].area_type,
          checkin_datetime:this.datetime,
          service_type_id: this.typeService[this.type].id,
          amount: this.number,
          hour_stay: this.hourstay,
          note: this.note
        }
    }
    this.bookingservice.setBooking(data);
    // console.log(data, '__data');
    // this.bookingservice.createbooking()
    this.router.navigate(['booking-detail']);
  }
  back(){
    this.router.navigate(['booking']);
  }

  getGameService(){
    this.bookingservice.getGameServiceTypes().then(data=>{
      this.typeService = data.service_types;
    })
  }

  ngOnchange(){
    this.check();
  }

  check():boolean{
    if(this.type != null && this.number > 0 && this.date != null && this.time != null && this.hourstay != null){
      return false;
    }
    return true;
  }
}
