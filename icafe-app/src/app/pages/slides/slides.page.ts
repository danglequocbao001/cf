import { Component, OnInit,ViewChild  } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss'],
})
export class SlidesPage implements OnInit {
  @ViewChild ('mySlider',{ static: true })  slides: IonSlides;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
  passSlide(){
    this.router.navigate(['tabs']);
  }
  nextSlide(){
    this.slides.slideNext();
  }
  preSlide() {
    this.slides.slidePrev();
  }
  gotoLogin(){
    this.router.navigate(['tabs']);
  }
}
