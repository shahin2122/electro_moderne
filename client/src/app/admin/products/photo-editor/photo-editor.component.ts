import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { AccountService } from 'src/app/account/account.service';
import { Photo } from 'src/app/shared/models/photo';
import { product } from 'src/app/shared/models/product';
import { IUSer } from 'src/app/shared/models/user';
import { environment } from 'src/environments/environment';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss']
})
export class PhotoEditorComponent implements OnInit {

   product: product;
   photosOfProduct: Photo[];
   uploader: FileUploader;
   hasBaseDropZoneOver = false;
   baseUrl = environment.baseApiUrl;
   user: IUSer;

  constructor(private adminService: AdminService, private accountService: AccountService,
    private route: ActivatedRoute, private toastr: ToastrService, private router: Router) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user)
   }

  ngOnInit(): void {
    this.adminService.getPhotosOfProduct(Number(this.route.snapshot.paramMap.get('productId'))).subscribe(response =>{
        this.photosOfProduct = response;
   });
   this.product = this.adminService.productToAddPhoto;
    this.initializeUploader();
  }

  fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }


  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'products/add-photo/' + this.product.id,
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

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if(response) {
        const photo = JSON.parse(response);
        this.photosOfProduct.push(photo);
        this.toastr.success("Photo Added Successfully");
        this.uploader.queue.length = 0;
      }
    }
  }

  setMainPhoto(photo: Photo) {
    this.adminService.setMainPhoto(photo.id, this.product.id).subscribe(() =>{
      this.product.photoUrl = photo.url;
      this.photosOfProduct.forEach(p => {
        if(p.isMain) p.isMain = false;
        if(p.id === photo.id) p.isMain = true;
        
      })
      this.toastr.success("please refresh your page");
      console.log(photo.id);
    });
  }

  deletePhoto(photoId: number) {
    this.adminService.deletePhoto(this.product.id,photoId).subscribe(() => {
      this.photosOfProduct = this.photosOfProduct.filter(x => x.id !== photoId);
    })
  }

}
