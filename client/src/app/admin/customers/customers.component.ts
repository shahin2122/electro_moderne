import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ICustomer } from 'src/app/shared/models/customer';
import { CustomerParams } from 'src/app/shared/models/customerParams';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  @ViewChild('search', {static: false}) searchTerm: ElementRef
  customers: ICustomer[];
  customerParams = new CustomerParams();
  totalCount:number;

  constructor(private adminService: AdminService, private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.adminService.getCustomersPaginated(this.customerParams).subscribe(response =>{
      this.customers = response.data;
      this.customerParams.pageNumber = response.pageIndex;
      this.customerParams.pageSize = response.pageSize;
      this.totalCount = response.count;
    }, error => {
      console.log(error);
    })
  }

  onSearch() {
    this.customerParams.search = this.searchTerm.nativeElement.value;
    this.customerParams.pageNumber = 1;
    this.getCustomers();
  }

  onPageChanged(event:any) {
    if(this.customerParams.pageNumber !== event){
    this.customerParams.pageNumber = event;
    this.getCustomers();
    }
  }

  onClick(customerId: number ) {
    this.adminService.getCustomer(customerId).subscribe(response => {
      this.router.navigateByUrl("admin/customers/" + customerId);
    });
  }


  deleteCustomer(customerId: number){
    this.adminService.deleteCustomer(customerId).subscribe(() => {
      this.toastr.success("customer deleted");
      this.getCustomers();
    }, error => {
      this.toastr.error(error.message);
      console.log(error);
    })
  }
}
