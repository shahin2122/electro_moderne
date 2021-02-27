import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IPagination } from '../shared/models/pagination';
import { IProductBrand } from '../shared/models/productBrand';
import { IProductType } from '../shared/models/productType';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
baseUrl = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<IPagination>(this.baseUrl + 'products');
  }

  getTypes() {
    return this.http.get<Partial<IProductType[]>>(this.baseUrl + 'types');
  }

  getBrands() {
    return this.http.get<Partial<IProductBrand[]>>(this.baseUrl + 'brands');
  }

}
