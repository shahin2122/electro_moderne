import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/shared/models/Order';
import { BreadcrumbService } from 'xng-breadcrumb';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-admin-order-detailed',
  templateUrl: './admin-order-detailed.component.html',
  styleUrls: ['./admin-order-detailed.component.scss']
})
export class AdminOrderDetailedComponent implements OnInit {
  order: IOrder;
  tps5: number;
  tvq9975: number;
  totalTaxed: number;

  constructor(private adminService: AdminService)
   {}

  ngOnInit(): void {
    this.order = this.adminService.OrderDetailed;
    this.tps5 = (this.order.total * 5) / 100;
    this.tvq9975 = (this.order.total * 9.975) / 100;
    this.totalTaxed = this.order.total + this.tps5 + this.tvq9975;
  }

}
