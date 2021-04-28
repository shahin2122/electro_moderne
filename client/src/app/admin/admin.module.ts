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
import { PhotoEditorComponent } from './products/photo-editor/photo-editor.component';
import { PartsComponent } from './parts/parts.component';
import { AddNewPartComponent } from './parts/add-new-part/add-new-part.component';
import { PartBrandsComponent } from './part-brands/part-brands.component';
import { PartTypesComponent } from './part-types/part-types.component';
import { AddNewPartTypeComponent } from './part-types/add-new-part-type/add-new-part-type.component';
import { AddNewPartBrandComponent } from './part-brands/add-new-part-brand/add-new-part-brand.component';
import { PartPhotoEditorComponent } from './parts/part-photo-editor/part-photo-editor.component';
import { OrdersComponent } from './orders/orders.component';
import { RepairRequestsComponent } from './repair-requests/repair-requests.component';
import { RequestDetailedComponent } from './repair-requests/request-detailed/request-detailed.component';
import { AdminOrderDetailedComponent } from './orders/admin-order-detailed/admin-order-detailed.component';





@NgModule({
  declarations: [UsersComponent, ProductsComponent, PannelComponent, 
    ProductBrandsComponent, ProductTypesComponent, AddNewTypeComponent, 
    AddNewBrandComponent, AddNewProductComponent, PhotoEditorComponent,
     PartsComponent, AddNewPartComponent, PartBrandsComponent, PartTypesComponent,
      AddNewPartTypeComponent, AddNewPartBrandComponent, PartPhotoEditorComponent,
       OrdersComponent, RepairRequestsComponent, RequestDetailedComponent, AdminOrderDetailedComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
  ]
})
export class AdminModule { }
