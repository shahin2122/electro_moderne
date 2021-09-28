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
import { OrderTotalsComponent } from './components/order-totals/order-totals.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { StepperComponent } from './components/stepper/stepper.component';
import { BasketSummaryComponent } from './components/basket-summary/basket-summary.component';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LatestProductsComponent } from './components/latest-products/latest-products.component'
import { ProductItemComponent } from './components/product-item/product-item.component';
import { LatestPartsComponent } from './components/latest-parts/latest-parts.component';
import { PartItemComponent } from './components/part-item/part-item.component';
import { BlogItemComponent } from './components/blog-item/blog-item.component';
import { HomePageBlogItemComponent } from './components/home-page-blog-item/home-page-blog-item.component';
import { LatestBlogsComponent } from '../latest-blogs/latest-blogs.component';
import { QuillModule } from 'ngx-quill';



@NgModule({
  declarations: [TextInputComponent, PagingHeaderComponent, PagerComponent, OrderTotalsComponent, StepperComponent, 
    BasketSummaryComponent, LatestProductsComponent,ProductItemComponent, LatestPartsComponent,PartItemComponent,
     BlogItemComponent, HomePageBlogItemComponent, LatestBlogsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    CarouselModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    QuillModule.forRoot(),
    FileUploadModule,
    NgxGalleryModule,
    PaginationModule.forRoot(),
    CdkStepperModule,
    RouterModule,
    ModalModule.forRoot()
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
    OrderTotalsComponent,
    CdkStepperModule,
    StepperComponent,
    BasketSummaryComponent,
    ModalModule,
    LatestProductsComponent,
    ProductItemComponent,
    PartItemComponent,
    LatestPartsComponent,
    BlogItemComponent,
    HomePageBlogItemComponent,
    LatestBlogsComponent,
    QuillModule,
  
  ]
})
export class SharedModule { }
