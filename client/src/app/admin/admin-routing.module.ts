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
import { PhotoEditorComponent } from './products/photo-editor/photo-editor.component';
import { PartsComponent } from './parts/parts.component';
import { AddNewPartComponent } from './parts/add-new-part/add-new-part.component';
import { PartBrandsComponent } from './part-brands/part-brands.component';
import { AddNewPartTypeComponent } from './part-types/add-new-part-type/add-new-part-type.component';
import { AddNewPartBrandComponent } from './part-brands/add-new-part-brand/add-new-part-brand.component';
import { PartPhotoEditorComponent } from './parts/part-photo-editor/part-photo-editor.component';
import { OrdersComponent } from './orders/orders.component';
import { AdminOrderDetailedComponent } from './orders/admin-order-detailed/admin-order-detailed.component';


const routes: Routes = [
  {path: 'users', component: UsersComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'parts', component: PartsComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'orderdetailed', component: AdminOrderDetailedComponent},
  {path: 'add-new-product', component: AddNewProductComponent },
  {path: 'add-new-product/:id', component: AddNewProductComponent },
  {path: 'add-new-part', component: AddNewPartComponent},
  {path: 'add-new-part/:id', component: AddNewPartComponent},
  {path: 'pannel', component: PannelComponent},
  {path: 'types', component: ProductTypesComponent},
  {path: 'add-new-type', component: AddNewTypeComponent},
  {path: 'add-new-type/:id', component: AddNewTypeComponent},
  {path: 'brands', component: ProductBrandsComponent},
  {path: 'part-brands', component: PartBrandsComponent},
  {path: 'add-new-brand', component: AddNewBrandComponent},
  {path: 'add-new-brand/:id', component: AddNewBrandComponent},
  {path: 'add-new-part-type', component: AddNewPartTypeComponent},
  {path: 'add-new-part-type/:id', component: AddNewPartTypeComponent},
  {path: 'add-new-part-brand', component: AddNewPartBrandComponent},
  {path: 'add-new-part-brand/:id', component: AddNewPartBrandComponent},
  {path: 'photo-editor/:productId', component: PhotoEditorComponent},
  {path: 'part-photo-editor/:partId', component: PartPhotoEditorComponent},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
