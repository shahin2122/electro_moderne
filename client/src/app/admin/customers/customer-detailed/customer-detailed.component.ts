import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICustomer } from 'src/app/shared/models/customer';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-customer-detailed',
  templateUrl: './customer-detailed.component.html',
  styleUrls: ['./customer-detailed.component.scss']
})
export class CustomerDetailedComponent implements OnInit {
 customer: ICustomer;

  constructor(private adminService: AdminService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadCustomer();
  }

  loadCustomer() {
    this.adminService.getCustomer(+this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe(response => {
        this.customer = response;
      })
  }
}
