import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TextInputComponent } from './components/text-input/text-input.component';
import { ToastrModule } from 'ngx-toastr';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagerComponent } from './components/pager/pager.component';


@NgModule({
  declarations: [TextInputComponent, PagingHeaderComponent, PagerComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    CarouselModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    FileUploadModule,
    NgxGalleryModule,
    PaginationModule.forRoot(),
  
  ],
  exports: [
    ReactiveFormsModule,
    BsDropdownModule,
    TextInputComponent,
    ToastrModule,
    CarouselModule,
    FileUploadModule,
    NgxGalleryModule,
    PaginationModule,
    PagingHeaderComponent,
    PagerComponent,
   
  ]
})
export class SharedModule { }
