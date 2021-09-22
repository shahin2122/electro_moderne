import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AdminService } from '../admin/admin.service';
import { AppRoutingModule } from '../app-routing.module';
import { IBlog } from '../shared/models/blog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  blogs: IBlog[];

  constructor(private router: Router,private adminService: AdminService) { }

  ngOnInit(): void {
    
  }

  goToShop(){
    this.router.navigateByUrl("/shop");
   
  }
}
