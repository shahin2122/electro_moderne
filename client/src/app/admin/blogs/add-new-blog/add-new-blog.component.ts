import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { ToastrService } from 'ngx-toastr';
import { IBlog } from 'src/app/shared/models/blog';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-add-new-blog',
  templateUrl: './add-new-blog.component.html',
  styleUrls: ['./add-new-blog.component.scss']
})
export class AddNewBlogComponent implements OnInit {
  addBlogForm: FormGroup;
  isUpdate = false;
  blog: IBlog;
  editorText = '';

  constructor(private adminService: AdminService, private toastr: ToastrService, 
    private router:Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.initializeForm();

    if(this.activatedRoute.snapshot.paramMap.get('id'))
    {
      this.isUpdate = true;
      this.adminService.getBlog(Number(this.activatedRoute.snapshot.paramMap.get('id')))
        .subscribe(response => {
          this.blog = response;
          this.addBlogForm.get('title').patchValue(this.blog.title);
          this.addBlogForm.get('text').patchValue(this.blog.text);
        })
    }
  }

  initializeForm(){
    this.addBlogForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(){
    this.blog = this.addBlogForm.value;
    this.blog.rawText = this.editorText;
    if(this.isUpdate)
    {
      this.adminService.updateBlog(Number(this.activatedRoute.snapshot.paramMap.get('id')), this.blog)
        .subscribe((response : IBlog) => {
          this.toastr.success("Blog Edited");
          this.adminService.blogToAddPhoto = response;
          this.router.navigateByUrl("/admin/blog-photo-editor/" + response.id);
        }, error => {
          console.log(error);
          this.toastr.error(error);
        })
    }else{
      this.adminService.addNewBlog(this.blog).subscribe((response : IBlog) => {
        this.toastr.success("New Blog Added");
        this.adminService.blogToAddPhoto = response;
        this.router.navigateByUrl("/admin/blog-photo-editor/" + response.id);
      }, error => {
        console.log(error);
        this.toastr.error(error.message);
      })
    }
  }

  changeEditor(event: EditorChangeContent ){
    this.editorText = event['text'];
    console.log(event);
    console.log(this.editorText);
    
  }
}
