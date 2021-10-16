import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IBlog } from 'src/app/shared/models/blog';
import { BlogParams } from 'src/app/shared/models/blogParams';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
 blogs: IBlog[];
 blogParams = new BlogParams();
 totalCount: number;

  constructor(private adminService: AdminService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs(){
    this.adminService.getBlogsPaginated(this.blogParams).subscribe(response =>{
      this.blogs = response.data;
      this.blogParams.pageNumber = response.pageIndex;
      this.blogParams.pageSize = response.pageSize;
      this.totalCount = response.count;
      console.log(response);
      console.log(this.blogParams.pageNumber);
    })
  }

  onPageChanged(event: any) {
    if(this.blogParams.pageNumber !== event){
      this.blogParams.pageNumber = event;
      console.log(this.blogParams.pageNumber);
      console.log(event);
      this.getBlogs();
    }
  }

  deleteBlog(blogId:number){
    this.adminService.deleteBlog(blogId).subscribe(()=> {
      this.toastr.success("Blog Deleted");
      this.getBlogs();
    }, error => {
      this.toastr.error(error.message);
      console.log(error);
    })
  }
}
