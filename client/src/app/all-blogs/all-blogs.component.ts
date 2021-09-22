import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin/admin.service';
import { IBlog } from '../shared/models/blog';
import { BlogParams } from '../shared/models/blogParams';

@Component({
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.scss']
})
export class AllBlogsComponent implements OnInit {

  blogs: IBlog[];
  blogParams = new BlogParams();
  totalCount: number;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs(){
    this.adminService.getBlogsPaginated(this.blogParams).subscribe(response =>{
      this.blogs = response.data;
      this.blogParams.pageNumber = response.pageIndex;
      this.blogParams.pageSize = response.pageSize;
      this.totalCount = response.count;
    })
  }

  onPageChanged(event: any) {
    if(this.blogParams.pageNumber !== event){
      this.blogParams.pageNumber = event;
      this.getBlogs();
    }
  }

}
