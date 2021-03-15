import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { AccountService } from 'src/app/account/account.service';
import { IPart } from 'src/app/shared/models/part';
import { Photo } from 'src/app/shared/models/photo';
import { IUSer } from 'src/app/shared/models/user';
import { environment } from 'src/environments/environment';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-part-photo-editor',
  templateUrl: './part-photo-editor.component.html',
  styleUrls: ['./part-photo-editor.component.scss']
})
export class PartPhotoEditorComponent implements OnInit {
part: IPart;
photosOfPart: Photo[];
uploader: FileUploader;
hasBaseDropZoneOver = false;
baseUrl = environment.baseApiUrl;
user: IUSer;

constructor(private adminService: AdminService, private accountService: AccountService,
  private route: ActivatedRoute, private toastr: ToastrService, private router: Router) {
  this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user)
 }

  ngOnInit(): void {
    this.adminService.getPhotosOfPart(Number(this.route.snapshot.paramMap.get('partId')))
    .subscribe(response => {
      this.photosOfPart = response;
    });
    this.part = this.adminService.partToAddPhoto;
    this.initializeUploader();
  }

  fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }


  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'parts/add-photo/' + this.part.id,
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
        this.photosOfPart.push(photo);
        this.toastr.success("Photo Added Successfully");
        this.uploader.queue.length = 0;
      }
    }
  }
  
  setMainPhoto(photo: Photo) {
    this.adminService.setMainPartPhoto(photo.id, this.part.id).subscribe(() =>{
      this.part.photoUrl = photo.url;
      this.photosOfPart.forEach(p => {
        if(p.isMain) p.isMain = false;
        if(p.id === photo.id) p.isMain = true;
        
      })
      this.toastr.success("photo is now Main photo");
     
    });
  }

  deletePhoto(photoId: number) {
    this.adminService.deletePartPhoto(this.part.id,photoId).subscribe(() => {
      this.photosOfPart = this.photosOfPart.filter(x => x.id !== photoId);
    })
  }

}
