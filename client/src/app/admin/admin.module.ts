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
import { ReactiveFormsModule } from '@angular/forms';
import { CustomersComponent } from './customers/customers.component';
import { AddNewCustomerComponent } from './customers/add-new-customer/add-new-customer.component';
import { CustomerDetailedComponent } from './customers/customer-detailed/customer-detailed.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { AddNewInvoiceComponent } from './invoices/add-new-invoice/add-new-invoice.component';
import { InvoiceDetailsComponent } from './invoices/invoice-details/invoice-details.component';
import { UpdateInvoiceComponent } from './invoices/update-invoice/update-invoice.component';
import { BlogsComponent } from './blogs/blogs.component';
import { AddNewBlogComponent } from './blogs/add-new-blog/add-new-blog.component';
import { BlogPhotoEditorComponent } from './blogs/blog-photo-editor/blog-photo-editor.component';





@NgModule({
  declarations: [UsersComponent, ProductsComponent, PannelComponent, 
    ProductBrandsComponent, ProductTypesComponent, AddNewTypeComponent, 
    AddNewBrandComponent, AddNewProductComponent, PhotoEditorComponent,
     PartsComponent, AddNewPartComponent, PartBrandsComponent, PartTypesComponent,
      AddNewPartTypeComponent, AddNewPartBrandComponent, PartPhotoEditorComponent,
       OrdersComponent, RepairRequestsComponent, RequestDetailedComponent, AdminOrderDetailedComponent, CustomersComponent, AddNewCustomerComponent, CustomerDetailedComponent, InvoicesComponent, AddNewInvoiceComponent, InvoiceDetailsComponent, UpdateInvoiceComponent, BlogsComponent, AddNewBlogComponent, BlogPhotoEditorComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,

  ]
})
export class AdminModule { }
