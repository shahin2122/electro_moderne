import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin/admin.service';
import { IBlog } from '../../models/blog';

@Component({
  selector: 'app-blog-item',
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.scss']
})
export class BlogItemComponent implements OnInit {
 @Input() blog: IBlog;
  url: string;
 // shortTitle: string;

  constructor(private router: Router, private adminService: AdminService) { }

  ngOnInit(): void {
    this.url = this.blog.title.replace(/ /g, '-');
   // this.shortTitle = this.blog.rawText.substring(0, 200);
    
  }

 

}
