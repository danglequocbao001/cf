import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from 'src/app/@core-app';
import * as moment from 'moment';
@Component({
  selector: 'app-coffeebooking',
  templateUrl: './coffeebooking.page.html',
  styleUrls: ['./coffeebooking.page.scss'],
})
export class CoffeebookingPage implements OnInit {
  status:boolean = false;
  number: number;
  date: string;
  time: string;
  flagdate: string;
  flagtime:string;
  datetime:string='';
  type: number;
  typeService: any;
  hourstay: number;
  note: string = '';
  constructor(
    private router: Router,
    private bookingservice: BookingService
    ) { 
      this.getServiceType();
    }
  floors = [
    {
      floor:'COFFEE SÂN VƯỜN',
      id:0,
    },
    {
      floor:'COFFEE SÂN THƯỢNG',
      id:1,
    },
    {
      floor:'COFFEE SÂN GIƯỜNG',
      id:2,
    },
    {
      floor:'COFFEE PHÒNG LẠNH',
      id:3,
    },
  ]
  longtime = [
    {
      time: "1 tiếng",
      value: 1
    },
    {
      time:"2 tiếng",
      value: 2
    },
    {
      time: "3 tiếng",
      value: 3
    },
    {
      time: "4 tiếng",
      value: 4
    },
  ]
  gotodetail(){
    this.flagdate = moment(this.date).format('DD-MM-YYYY');
    this.flagtime =  moment(this.time).format('HH:mm');
    this.datetime = this.flagdate + ',' + this.flagtime;
    const data:any = {
      booking:{
        book_type: this.typeService[this.type].area_type,
        checkin_datetime:this.datetime,
        service_type_id: this.typeService[this.type].id,
        amount: this.number,
        hour_stay: this.hourstay,
        note: this.note,
      }
    }
    this.bookingservice.setBooking(data);
    // console.log(data, '__data');
    this.router.navigate(['booking-detail']);
  }
  back(){
     this.router.navigate(['booking']);
  }
  getServiceType(){
    this.bookingservice.getCoffeeServiceTypes().then(data=>{
      this.typeService = data.service_types;
    });
  }
  ngOnInit() {
  }
  
  ngOnchange() {
    this.check();
  }
  // testing
  check():boolean{
    if(this.number > 0 && this.date != null && this.time != null && this.date != null && this.type != null){
      return false;
    }
    else return true;
  }
}
