import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@core-app';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.page.html',
  styleUrls: ['./rule.page.scss'],
})
export class RulePage implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  back(){
    this.router.navigate(['/questionare']);
    
  }
}
