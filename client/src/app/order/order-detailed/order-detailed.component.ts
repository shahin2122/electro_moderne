import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from 'src/app/shared/models/Order';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.scss']
})
export class OrderDetailedComponent implements OnInit {
order: IOrder;
tps5: number;
tvq9975: number;
totalTaxed: number;

  constructor(private route: ActivatedRoute, private breadcrumbService: BreadcrumbService,
    private orderService: OrderService) {
      this.breadcrumbService.set('@OrderDetailed', '');
     }

  ngOnInit(): void {
    this.orderService.getOrderDetailed(+this.route.snapshot.paramMap.get('id'))
      .subscribe((order: IOrder) => {
        this.order = order;
        this.breadcrumbService.set('@OrderDetailed', `Order# ${order.id} - ${order.status}`);
        this.tps5 = (this.order.total * 5) / 100;
        this.tvq9975 = (this.order.total * 9.975) / 100;
        this.totalTaxed = this.order.total + this.tps5 + this.tvq9975;
      }, error => {
        console.log(error);
      });



  }

}
