import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSerivce, AuthService, UserPointsService } from 'src/app/@core-app';

@Component({
  selector: 'app-reward-points',
  templateUrl: './reward-points.page.html',
  styleUrls: ['./reward-points.page.scss'],
})
export class RewardPointsPage implements OnInit {
  userInfo: any;
  image_url:any;
  
  constructor(
    private userService: UserSerivce,
    private authService: AuthService, 
    private userPointsService: UserPointsService,
    private router: Router,
    private currencyPipe: CurrencyPipe,
    private route: ActivatedRoute) { }
    getPoints: number;
    getTurns: number;
    buySlots:number;
  ngOnInit() {
    this.getUserInfo();
    this.getUserPoints();
    
  }
  // ionviewDidLoad(){
  //   console.log('ionViewDidLoad');
  // }

  getUserPoints() {
    this.userPointsService.getUserPoint().then((data) => {
      this.getPoints = data.score;  
      this.getTurns = data.playing_slots;
      this.buySlots = data.buy_slots;
      // console.log('data: ', this.getPoints)
      // const y:number =+ this.getPoints;
      // y = this.currencyPipe.transform(this.getPoints, '', true, '1.2-2')
    })
  }

  ionViewDidEnter(){
    this.route.queryParams.subscribe((params) =>{
        // console.log('params',params);
        if(params === null || params === undefined) {
            // console.log('zo');
            this.getUserInfo();
        }else{
            // console.log('zo2');
            this.image_url = JSON.parse(params["data"]);
            // console.log(JSON.parse(params["data"]));
            // console.log('image: ', this.image_url);
        } 
    })
  }

  getUserInfo() {
    this.authService.info().subscribe(res => this.userInfo = res);
}

  back() {
    this.userService.getInfoUser().then((data)=>{
      this.router.navigate(['detail-user'],{
        queryParams:{
          data: JSON.stringify(data['avatar'])
        }
      });
      // console.log('a',data['avatar']);
      
    })
  }
}
