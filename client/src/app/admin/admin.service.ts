import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IProductBrand } from '../shared/models/productBrand';
import { IProductType } from '../shared/models/productType';
import { IUSer } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
baseUrl = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  addNewProduct(model: any) {
      return this.http.post(this.baseUrl + 'products/add-new-product', model);
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
}
