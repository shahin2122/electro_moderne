import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/admin/admin.service';
import { IBlog } from 'src/app/shared/models/blog';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {
  blog: IBlog;
  title: string;
  shortTitle: string;
  htmlText: string;


  constructor(private activatedRoute: ActivatedRoute, private bcService: BreadcrumbService,
    private adminService: AdminService) {
    this.bcService.set('@BlogDetails','');
   }

  ngOnInit(): void {
    this.title = this.activatedRoute.snapshot.paramMap.get('title');
    this.adminService.getBlogByTitle(this.title)
      .subscribe(response => {
        this.bcService.set('@BlogDetails', response.title);
        this.blog = response;
        this.shortTitle = this.blog.text.substring(0, 200);
      })

  
  }

 
}
