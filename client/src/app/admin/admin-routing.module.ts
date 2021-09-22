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
import { CustomersComponent } from './customers/customers.component';
import { CustomerDetailedComponent } from './customers/customer-detailed/customer-detailed.component';
import { AddNewCustomerComponent } from './customers/add-new-customer/add-new-customer.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { AddNewInvoiceComponent } from './invoices/add-new-invoice/add-new-invoice.component';
import { InvoiceDetailsComponent } from './invoices/invoice-details/invoice-details.component';
import { BlogsComponent } from './blogs/blogs.component';
import { AddNewBlogComponent } from './blogs/add-new-blog/add-new-blog.component';
import { BlogPhotoEditorComponent } from './blogs/blog-photo-editor/blog-photo-editor.component';


const routes: Routes = [
  {path: 'blogs', component: BlogsComponent},
  {path: 'add-new-blog', component: AddNewBlogComponent},
  {path: 'add-new-blog/:id', component: AddNewBlogComponent},
  {path: 'users', component: UsersComponent},
  {path: 'customers', component: CustomersComponent},
  {path: 'customers/:id', component: CustomerDetailedComponent},
  {path: 'invoices', component: InvoicesComponent},
  {path: 'invoices/:id', component: InvoiceDetailsComponent},
  {path: 'add-new-invoice', component: AddNewInvoiceComponent},
  {path: 'add-new-invoice/:id', component: AddNewInvoiceComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'parts', component: PartsComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'orderdetailed', component: AdminOrderDetailedComponent},
  {path: 'add-new-product', component: AddNewProductComponent },
  {path: 'add-new-product/:id', component: AddNewProductComponent },
  {path: 'add-new-customer', component: AddNewCustomerComponent},
  {path: 'add-new-customer/:id', component: AddNewCustomerComponent},
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
  {path: 'blog-photo-editor/:blogId', component: BlogPhotoEditorComponent},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
