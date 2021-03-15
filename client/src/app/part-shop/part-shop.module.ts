import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartShopComponent } from './part-shop.component';
import { PartItemComponent } from './part-item/part-item.component';
import { PartDetailsComponent } from './part-details/part-details.component';
import { PartShopRoutingModule } from './part-shop-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';



@NgModule({
  declarations: [PartShopComponent, PartItemComponent, PartDetailsComponent],
  imports: [
    CommonModule,
    PartShopRoutingModule,
    SharedModule,
    NgxGalleryModule
  ]
})
export class PartShopModule { }
