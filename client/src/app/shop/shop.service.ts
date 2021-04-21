import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IPagination } from '../shared/models/pagination';
import { Photo } from '../shared/models/photo';
import { product } from '../shared/models/product';
import { IProductBrand } from '../shared/models/productBrand';
import { IProductType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
baseUrl = environment.baseApiUrl;
products: product[] = [];
brands: IProductBrand[] = [];
types: IProductType[] = [];
photos: Photo[] = [];

  constructor(private http: HttpClient) { }

  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();

    if(shopParams.brandId !== 0) {
      params = params.append('brandId', shopParams.brandId.toString());
    }

    if(shopParams.typeId !== 0) {
      params = params.append('typeId', shopParams.typeId.toString());
    }

    if(shopParams.search) {
     params = params.append('search', shopParams.search);
  
    }
    
    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('pageIndex', shopParams.pageSize.toString());

    return this.http.get<IPagination>(this.baseUrl + 'products', {observe: 'response', params})
      .pipe(
        map(response => {
          this.products = response.body.data;
          return response.body;
        })
      );
  }

  getTypes() {
    if(this.types.length > 0){
      return of(this.types);
    }
    return this.http.get<IProductType[]>(this.baseUrl + 'types/get-all-raw').pipe(
      map(response => {
        this.types = response;
        return response;
      })
    );
  }

  getBrands() {
    if(this.brands.length > 0) {
      return of(this.brands);
    }
    return this.http.get<IProductBrand[]>(this.baseUrl + 'brands/get-all-raw').pipe(
      map(response => {
        this.brands = response;
        return response;
      })
    );
  }

  getProduct(id: number) {
    const product = this.products.find(p => p.id === id);

    if(product){
      return of(product); 
    }
    return this.http.get<product>(this.baseUrl + 'products/' + id);
  }

  getPhotosOfProduct(productId: number) {
    if(this.photos.length > 0) {
      return of(this.photos);
    }
    return this.http.get<Photo[]>(this.baseUrl + 'photos/' + productId).pipe(
      map(response => {
        this.photos = response;
        return response;
      })
    );
  }
}
