import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProductBrand } from '../shared/models/productBrand';
import { IProductType } from '../shared/models/productType';
import { IUSer } from '../shared/models/user';
import { IPagination } from '../shared/models/pagination';
import { product } from '../shared/models/product';
import { Photo } from '../shared/models/photo';
import { map } from 'rxjs/operators';
import { AdminProductsParams } from '../shared/models/adminProductsParams';
import { PartsParams } from '../shared/models/PartsParams';
import { IPart } from '../shared/models/part';
import { IPartType } from '../shared/models/partType';
import { IPartBrand } from '../shared/models/partBrand';
import { UserParams } from '../shared/models/usersParams';
import { IOrder } from '../shared/models/Order';
import { CustomerParams } from '../shared/models/customerParams';
import { ICustomer } from '../shared/models/customer';
import { InvoiceParams } from '../shared/models/invoiceParams';
import { IInvoice } from '../shared/models/invoice';
import { InvoiceService } from './invoices/invoice.service';
import { AccountService } from '../account/account.service';
import { BlogParams } from '../shared/models/blogParams';
import { IBlog } from '../shared/models/blog';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
baseUrl = environment.baseApiUrl;

partToAddPhoto: IPart;
productToAddPhoto: product;
OrderDetailed: IOrder;
blogToAddPhoto: IBlog;


  constructor(private http: HttpClient, private invoiceService: InvoiceService, private accountService: AccountService) { }


  getBlogsPaginated(blogParams: BlogParams){
    let params = new HttpParams();
    

    
    if(blogParams.search){
      params = params.append('search', blogParams.search);

    }

    params = params.append('pageIndex', blogParams.pageNumber.toString());
    params = params.append('pageIndex', blogParams.pageSize.toString());



   return this.http.get<IPagination>(this.baseUrl + 'blogs', {observe: 'response', params})
    .pipe(
      map(response => {
        return response.body;
      })
    );
  }

  
  addNewBlog(model: any){
    return this.http.post(this.baseUrl + 'blogs', model);
  }

  getBlog(id: number){
    return this.http.get<IBlog>(this.baseUrl + 'blogs/' + id);
  }

  getBlogByTitle(title: string){
    return this.http.get<IBlog>(this.baseUrl + 'blogs/get-by-title/' + title);
  }

  updateBlog(blogId: number, newBlog: IBlog){
    console.log("update from admin service",newBlog);
    return this.http.put(this.baseUrl + 'blogs/update/'+ blogId, newBlog);
  }

  updatePart(partId:number, newPart: IPart){
    return this.http.put(this.baseUrl + 'parts/update/' + partId, newPart);
  }

  deleteBlog(blogId: number){
    return this.http.delete(this.baseUrl + 'blogs/' + blogId);
  }

  deleteBlogPhoto(blogId: number) {
    return this.http.delete(this.baseUrl + 'blogs/delete-photo/' + blogId);
  }

  addNewInvoice(){
   this.accountService.currentUser$.subscribe(response => {
      this.invoiceService.invoiceToAdd.submitter = response.displayName;
    })
    return this.http.post(this.baseUrl + 'invoice', this.invoiceService.invoiceToAdd);
  }

 

  updateCustomer(customerId: number, newCustomer: ICustomer){ 
    return this.http.put(this.baseUrl + 'customers/update/' + customerId , newCustomer);
  }

  addNewCustomer(model: any){
    return this.http.post(this.baseUrl + 'customers', model);
  }

  addNewProduct(model: any) {
      return this.http.post(this.baseUrl + 'products/add-new-product', model);
  }

  addNewPart(model: any) {
    return this.http.post(this.baseUrl + 'parts/add-new-part', model);
  }

  
  getInvoicesPaginated(invoiceParams: InvoiceParams){
    let params = new HttpParams();

    if(invoiceParams.search){
      params = params.append('search', invoiceParams.search);
    }
    params = params.append('pageIndex', invoiceParams.pageNumber.toString());
    params = params.append('pageIndex', invoiceParams.pageSize.toString());

    return this.http.get<IPagination>(this.baseUrl + 'invoice', {observe: 'response', params})
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }

  getCustomersPaginated(customerParams: CustomerParams) {
    let params = new HttpParams();

    if(customerParams.search) {
      params = params.append('search', customerParams.search);
    }
    params = params.append('sort', customerParams.sort);
    params = params.append('pageIndex', customerParams.pageNumber.toString());
    params = params.append('pageIndex', customerParams.pageSize.toString());

    return this.http.get<IPagination>(this.baseUrl + 'customers', {observe: 'response', params})
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }

  getParts(partsparams: PartsParams) {
    let params = new HttpParams();

    if(partsparams.partBrandId !== 0) {
      params = params.append('partBrandId', partsparams.partBrandId.toString());
    }

    if(partsparams.PartTypeId !== 0) {
      params = params.append('partTypeId', partsparams.PartTypeId.toString());
    }

    if(partsparams.search) {
      params = params.append('search', partsparams.search);
     }

     params = params.append('sort', partsparams.sort);
     params = params.append('pageIndex', partsparams.pageNumber.toString());
     params = params.append('pageIndex', partsparams.pageSize.toString());

     return this.http.get<IPagination>(this.baseUrl + 'parts', {observe: 'response', params})
        .pipe(
          map(response => {
            return response.body;
          })
        );
  }

  getPart(id: number){
    return this.http.get<IPart>(this.baseUrl + 'parts/' + id);
  }

  deletePart(id: number){
    return this.http.delete(this.baseUrl + 'parts/' + id);
  }

  getProducts(productsParams: AdminProductsParams) {
    let params = new HttpParams();
   
    if(productsParams.brandId !== 0) {
      params = params.append('brandId', productsParams.brandId.toString());
    }

    if(productsParams.typeId !== 0) {
      params = params.append('typeId', productsParams.typeId.toString());
    }

    if(productsParams.search) {
     params = params.append('search', productsParams.search);
     
    }

    params = params.append('sort', productsParams.sort);
    params = params.append('pageIndex', productsParams.pageNumber.toString());
    params = params.append('pageIndex', productsParams.pageSize.toString());

    return this.http.get<IPagination>(this.baseUrl + 'products', {observe: 'response', params})
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }

  getUsersWithRoles(userParams: UserParams) {

    let params = new HttpParams();

    params = params.append('sort', userParams.sort);
    params = params.append('pageIndex', userParams.pageNumber.toString());
    params = params.append('pageIndex', userParams.pageSize.toString());

    return this.http.get<IPagination>(this.baseUrl + 'admin/users-with-roles', {observe: 'response', params})
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }

  getRepairmans(){
    return this.http.get(this.baseUrl + 'admin/repairmans');
  }

  updateUserRoles(email: string, roles: string[]) {
    return this.http.post(this.baseUrl + 'admin/edit-roles/' + email + '?roles=' + roles, {});
  }

  getTypesPaginated(pageNumber: number, pageSize: number) {
    let params = new HttpParams();

    params = params.append('pageIndex', pageNumber.toString());
    params = params.append('pageIndex', pageSize.toString());

    return this.http.get<IPagination>(this.baseUrl + 'types', {observe: 'response', params})
    .pipe(
      map(response => {
      return response.body;
    }));
  }

  getTypes() {
    return this.http.get<IProductType[]>(this.baseUrl + 'types/get-all-raw');
  }

  getType(id: number){
    return this.http.get<IProductType>(this.baseUrl + 'types/' + id);
  }

  getCustomer(id: number){
    return this.http.get<ICustomer>(this.baseUrl + 'customers/' + id);
  }

  getInvoice(id: number){
    return this.http.get<IInvoice>(this.baseUrl + 'invoice/' + id);
  }

  addNewType(typeName: any){
    return this.http.post(this.baseUrl + 'types/add-new-type/' + typeName,"");
  }

  updateType(typeId: number , newName: string){
    return this.http.post(this.baseUrl + 'types/update/' + typeId + '/' + newName , {});
  }

  addNewPartType(typeName: any){
    return this.http.post(this.baseUrl + 'parttypes/add-new-type/' + typeName,"");
  }

  deleteProductType(id: number){
    return this.http.delete(this.baseUrl + 'types/' + id);
  }

 
  getBrandsPaginated(pageNumber: number, pageSize: number) {
    let params = new HttpParams();

    params = params.append('pageIndex', pageNumber.toString());
    params = params.append('pageIndex', pageSize.toString());

    return this.http.get<IPagination>(this.baseUrl + 'brands', {observe: 'response', params})
    .pipe(
      map(response => {
        return response.body;
      })
    );
  }

  getBrands(){
    return this.http.get<IProductBrand[]>(this.baseUrl + 'brands/get-all-raw');
  }

  getBrand(id: number){
    return this.http.get<IProductBrand>(this.baseUrl + 'brands/' + id);
  }

  

  deleteCustomer(id: number){
    return this.http.delete(this.baseUrl+ 'customers/' + id);
  }

  updateProductBrand(brandId: number, newName: string){
    return this.http.post(this.baseUrl + 'brands/update/' + brandId + '/' + newName, {});
  }

  deleteProductBrand(id: number){
    return this.http.delete(this.baseUrl + 'brands/' + id);
  }

  getPartBrandsPaginated(pageNumber: number, pageSize: number){
    let params = new HttpParams();

    params = params.append('pageIndex', pageNumber.toString());
    params = params.append('pageIndex', pageSize.toString());

    return this.http.get<IPagination>(this.baseUrl + 'partbrands', {observe: 'response', params})
    .pipe(
      map(response => {
        return response.body;
      })
    );
  }

  getPartBrands(){
    return this.http.get<IPartBrand[]>(this.baseUrl + 'partbrands/get-all-raw');
  }

  getPartBrand(id: number){
    return this.http.get<IPartBrand>(this.baseUrl + 'partbrands/' + id);
  }

  updatePartBrand(brandId: number , newName: string){
    return this.http.post<IPartBrand>(this.baseUrl + 'partbrands/update/' + brandId + '/' + newName, {});
  }

 

  deletePartBrand(brandId: number){
    return this.http.delete(this.baseUrl + 'partbrands/' + brandId);
  }

  getPartTypesPaginated(pageNumber: number, pageSize: number){
    let params = new HttpParams();

    params = params.append('pageIndex', pageNumber.toString());
    params = params.append('pageIndex', pageSize.toString());

    return this.http.get<IPagination>(this.baseUrl + 'parttypes', {observe: 'response', params})
    .pipe(
      map(response => {
        return response.body;
      })
    );
  }

  getPartTypes(){
    return this.http.get<IPartType[]>(this.baseUrl + 'parttypes/get-all-raw');
  }

  getPartType(id: number){
    return this.http.get<IPartType>(this.baseUrl + 'parttypes/' + id);
  }

  updatePartType(typeId: number, newName: string) {
    return this.http.post<IPartType>(this.baseUrl + 'parttypes/update/' + typeId + '/' + newName,{});
  }

  deletePartType(id: number){
    return this.http.delete(this.baseUrl + 'parttypes/' + id);
  }

  addNewBrand(brandName: any) {
    return this.http.post(this.baseUrl + 'brands/add-new-brand/' + brandName,{});
  }

  addNewPartBrand(brandName: any) {
    return this.http.post(this.baseUrl + 'partbrands/add-new-brand/' + brandName, {});
  }

 getProductWithPhotos(productId: number){
   return this.http.get<product>(this.baseUrl + 'products/get-product-with-photos/' + productId);
 }

 getPhotosOfProduct(productId: number) {
   return this.http.get<Photo[]>(this.baseUrl + 'photos/' + productId);
 }
 
setMainPhoto(photoId: number, productId: number){
  return this.http.put(this.baseUrl + 'photos/set-main-photo/'+ productId + '-' + photoId, {});
}

deletePhoto(productId: number,photoId: number) {
  return this.http.delete(this.baseUrl + 'photos/'+ productId + '-' + photoId);
}

getPhotosOfPart(partId: number) {
  return this.http.get<Photo[]>(this.baseUrl + 'partphotos/' + partId);
}

setMainPartPhoto(photoId: number, partId: number) {
  return this.http.put(this.baseUrl + 'partphotos/set-main-photo/' + partId + '-' + photoId, {});
}

deletePartPhoto(partId: number, photoId: number) {
  return this.http.delete(this.baseUrl + 'partphotos/' + partId + '-' + photoId);
}

getOrderForAdmin(orderId: number, buyerEmail: string){
  return this.http.get<IOrder>(this.baseUrl + 'order/admin/' + orderId + '/' + buyerEmail)
    .pipe(
      map(response => {
        this.OrderDetailed = response;
      })
    );
}



}
