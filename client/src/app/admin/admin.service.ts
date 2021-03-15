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

@Injectable({
  providedIn: 'root'
})
export class AdminService {
baseUrl = environment.baseApiUrl;

partToAddPhoto: IPart;
productToAddPhoto: product;

  constructor(private http: HttpClient) { }

  addNewProduct(model: any) {
      return this.http.post(this.baseUrl + 'products/add-new-product', model);
  }

  addNewPart(model: any) {
    return this.http.post(this.baseUrl + 'parts/add-new-part', model);
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

  getUsersWithRoles() {
    return this.http.get<IUSer[]>(this.baseUrl + 'admin/users-with-roles');
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

  addNewType(typeName: any){
    return this.http.post(this.baseUrl + 'types/add-new-type/' + typeName,"");
  }
  addNewPartType(typeName: any){
    return this.http.post(this.baseUrl + 'parttypes/add-new-type/' + typeName,"");
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

}
