import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OrderService } from 'src/app/order/order.service';
import { IOrder } from 'src/app/shared/models/Order';
import { ordersParams } from 'src/app/shared/models/ordersParams';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  @ViewChild('search', {static: false}) searchTerm: ElementRef
 orders: IOrder[];
 ordersParams = new ordersParams();
 totalCount: number;
 

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getAllOrders(this.ordersParams).subscribe(response => {
      this.orders = response.data;
      this.ordersParams.pageNumber = response.pageIndex;
      this.ordersParams.pageSize = response.pageSize;
      this.totalCount = response.count;
    }, error => {
      console.log(error);
    });
  }

  onSearch() {
    this.ordersParams.search = this.searchTerm.nativeElement.value;
    this.ordersParams.pageNumber = 1;
    this.getOrders();
  }

  onPageChanged(event:any) {
    if(this.ordersParams.pageNumber !== event){
    this.ordersParams.pageNumber = event;
    this.getOrders();
    }
  }
}
