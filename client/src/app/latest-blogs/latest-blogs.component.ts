import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin/admin.service';
import { IBlog } from '../shared/models/blog';
import { BlogParams } from '../shared/models/blogParams';

@Component({
  selector: 'app-latest-blogs',
  templateUrl: './latest-blogs.component.html',
  styleUrls: ['./latest-blogs.component.scss']
})
export class LatestBlogsComponent implements OnInit {

  blogs: IBlog[];
  blogParams = new BlogParams();

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs(){
     this.adminService.getBlogsPaginated(this.blogParams).subscribe(response =>{
      this.blogs = response.data;
    })
  }

}
