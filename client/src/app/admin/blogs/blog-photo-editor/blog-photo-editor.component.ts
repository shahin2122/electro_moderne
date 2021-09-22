import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { AccountService } from 'src/app/account/account.service';
import { IBlog } from 'src/app/shared/models/blog';
import { IUSer } from 'src/app/shared/models/user';
import { environment } from 'src/environments/environment';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-blog-photo-editor',
  templateUrl: './blog-photo-editor.component.html',
  styleUrls: ['./blog-photo-editor.component.scss']
})
export class BlogPhotoEditorComponent implements OnInit {

  isUpdate = false;
  blog: IBlog;
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.baseApiUrl;
  user: IUSer;

  constructor(private adminService: AdminService, private accountService: AccountService,
    private route: ActivatedRoute, private toastr: ToastrService, private router: Router) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user)
   }

  ngOnInit(): void {
    this.blog = this.adminService.blogToAddPhoto;
    console.log(this.adminService.blogToAddPhoto);
    this.initializeUploader();
  }

  fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader(){
    this.uploader = new FileUploader({
      url: this.baseUrl + 'blogs/add-photo/' + this.blog.id,
      authToken:'Bearer ' + this.user.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (iitem,response, status, headers) => {
      if(response){
        const photo = JSON.parse(response);
        this.blog.photo = photo;
        this.adminService.blogToAddPhoto.photo = photo;
        this.toastr.success("Photo Added Successfully");
        this.uploader.queue.length = 0;
        this.router.navigateByUrl("/admin/pannel");
      }
    }
  }

  deletePhoto(){
    this.adminService.deleteBlogPhoto(this.blog.id).subscribe(() => {
      this.toastr.success("photo deleted");
      this.adminService.blogToAddPhoto.photo = null;
      this.adminService.blogToAddPhoto.photoUrl = null;
      this.ngOnInit();
    })
  }
}
