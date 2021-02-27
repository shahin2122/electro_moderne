import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProductBrand } from '../shared/models/productBrand';
import { IProductType } from '../shared/models/productType';
import { IUSer } from '../shared/models/user';
import { IPagination } from '../shared/models/pagination';
import { product } from '../shared/models/product';
import { Photo } from '../shared/models/photo';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
baseUrl = environment.baseApiUrl;


productToAddPhoto: product;

  constructor(private http: HttpClient) { }

  addNewProduct(model: any) {
      return this.http.post(this.baseUrl + 'products/add-new-product', model);
  }

  getProducts() {
   

    return this.http.get<IPagination>(this.baseUrl + 'products');
  }

  getUsersWithRoles() {
    return this.http.get<Partial<IUSer[]>>(this.baseUrl + 'admin/users-with-roles');
  }

  getTypes() {
    return this.http.get<Partial<IProductType[]>>(this.baseUrl + 'types');
  }

  addNewType(typeName: any){
    return this.http.post(this.baseUrl + 'types/add-new-type/' + typeName,"");
  }

  getBrands() {
    return this.http.get<Partial<IProductBrand[]>>(this.baseUrl + 'brands');
  }

  addNewBrand(brandName: any) {
    return this.http.post(this.baseUrl + 'brands/add-new-brand/' + brandName,{});
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

}
