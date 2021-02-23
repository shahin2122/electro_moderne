import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) { }


  getTypes() {
    return this.http.get<Partial<IProductType[]>>(this.baseUrl + 'types');
  }

  getBrands() {
    return this.http.get<Partial<IProductBrand[]>>(this.baseUrl + 'brands');
  }

}
