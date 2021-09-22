import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin/admin.service';
import { IBlog } from '../../models/blog';

@Component({
  selector: 'app-home-page-blog-item',
  templateUrl: './home-page-blog-item.component.html',
  styleUrls: ['./home-page-blog-item.component.scss']
})
export class HomePageBlogItemComponent implements OnInit {
 @Input() blog: IBlog;
 url: string;
 shortTitle: string;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.url = this.blog.title.replace(/ /g, '-');
    this.shortTitle = this.blog.text.substring(0, 100);
  }

}
