import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewsService} from 'src/app/@core-app';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.page.html',
  styleUrls: ['./news-detail.page.scss'],
})
export class NewsDetailPage implements OnInit {

  getData = {};

  constructor(private router: Router, private newsService: NewsService) { }

  ngOnInit() {
    this.getNewById();
  }
  back(){
    this.router.navigate(['./news']);
  }

  getNewById() {
    this.newsService.getNewById(localStorage.changeNewsData).then((data) => {
      this.getData = data.news;
      // console.log(this.getData);
    })
  }
}
