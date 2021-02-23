import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { ProductsComponent } from './products/products.component';
import { PannelComponent } from './pannel/pannel.component';
import { ProductBrandsComponent } from './product-brands/product-brands.component';
import { ProductTypesComponent } from './product-types/product-types.component';
import { AddNewTypeComponent } from './product-types/add-new-type/add-new-type.component';
import { AddNewBrandComponent } from './product-brands/add-new-brand/add-new-brand.component';
import { AddNewProductComponent } from './products/add-new-product/add-new-product.component';

const routes: Routes = [
  {path: 'users', component: UsersComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'add-new-product', component: AddNewProductComponent},
  {path: 'pannel', component: PannelComponent},
  {path: 'types', component: ProductTypesComponent},
  {path: 'add-new-type', component: AddNewTypeComponent},
  {path: 'brands', component: ProductBrandsComponent},
  {path: 'add-new-brand', component: AddNewBrandComponent},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
