import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IOrder } from '../shared/models/Order';
import { ordersParams } from '../shared/models/ordersParams';
import { IPagination } from '../shared/models/pagination';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
baseUrl = environment.baseApiUrl;
orders: IOrder[];


  constructor(private http: HttpClient) { }

  getOrdersForUser() {
    return this.http.get(this.baseUrl + 'order');
  }

  getOrderDetailed(id: number) {
    return this.http.get(this.baseUrl + 'order/' + id);
  }

  getAllOrders(orderParams: ordersParams) {
    let params = new HttpParams();

    if(orderParams.search) {
      params = params.append('search', orderParams.search);
    }

    params = params.append('pageIndex', orderParams.pageNumber.toString());
    params = params.append('pageIndex', orderParams.pageSize.toString());

    return this.http.get<IPagination>(this.baseUrl + "order/get-all", {observe: 'response', params})
      .pipe(
        map(response => {
          this.orders = response.body.data;
          return response.body;
        })
      );
  }
}
