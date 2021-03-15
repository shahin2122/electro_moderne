import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IPagination } from '../shared/models/pagination';
import { IPart } from '../shared/models/part';
import { IPartBrand } from '../shared/models/partBrand';
import { IPartType } from '../shared/models/partType';
import { ShopParams } from '../shared/models/shopParams';
import { IPartPhoto } from '../shared/models/PartPhoto';

@Injectable({
  providedIn: 'root'
})
export class PartShopService {
  baseUrl = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  getParts(shopParams: ShopParams){
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

    return this.http.get<IPagination>(this.baseUrl + 'parts', {observe: 'response', params})
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }

  getPart(id: number) {
    return this.http.get<IPart>(this.baseUrl + 'parts/' + id);
  }

  getTypes() {
    return this.http.get<IPartType[]>(this.baseUrl + 'parttypes/get-all-raw');
  }

  getBrands() {
    return this.http.get<IPartBrand[]>(this.baseUrl + 'partbrands/get-all-raw');
  }

  getPhotosOfPart(partId: number) {
    return this.http.get<IPartPhoto[]>(this.baseUrl + 'partphotos/' + partId);
  }
}
