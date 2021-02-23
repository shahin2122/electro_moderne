import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { ProductsComponent } from './products/products.component';
import { AdminRoutingModule } from './admin-routing.module';
import { PannelComponent } from './pannel/pannel.component';

import { ProductBrandsComponent } from './product-brands/product-brands.component';
import { ProductTypesComponent } from './product-types/product-types.component';
import { AddNewTypeComponent } from './product-types/add-new-type/add-new-type.component';
import { SharedModule } from '../shared/shared.module';
import { AddNewBrandComponent } from './product-brands/add-new-brand/add-new-brand.component';
import { AddNewProductComponent } from './products/add-new-product/add-new-product.component';



@NgModule({
  declarations: [UsersComponent, ProductsComponent, PannelComponent, ProductBrandsComponent, ProductTypesComponent, AddNewTypeComponent, AddNewBrandComponent, AddNewProductComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
  ]
})
export class AdminModule { }
