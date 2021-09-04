import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ShopRoutingModule } from './shop-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';


@NgModule({
  declarations: [ShopComponent],
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule,
    NgxGalleryModule
  ]
})
export class ShopModule {

 }
