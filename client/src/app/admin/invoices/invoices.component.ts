import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IInvoice } from 'src/app/shared/models/invoice';
import { InvoiceParams } from 'src/app/shared/models/invoiceParams';
import { AdminService } from '../admin.service';
import { InvoiceService } from './invoice.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {
  @ViewChild('search', {static: false}) searchTerm: ElementRef
  invoices: IInvoice[];
  invoiceParams = new InvoiceParams();
  totalCount: number;
  invoiceToUpdate: IInvoice;

  constructor(private adminService: AdminService, private router: Router,
    private toastr: ToastrService, private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.getInvoices();
  }

  getInvoices(){
    this.adminService.getInvoicesPaginated(this.invoiceParams).subscribe(response => {
      this.invoices = response.data;
      this.invoiceParams.pageNumber = response.pageIndex;
      this.invoiceParams.pageSize = response.pageIndex;
      this.totalCount = response.count;
      console.log(response.data);
    }, error => {
      console.log(error);
    })
  }

  onSearch() {
    this.invoiceParams.search = this.searchTerm.nativeElement.value;
    this.invoiceParams.pageNumber = 1;
    this.getInvoices();
  }

  onPageChanged(event:any) {
    if(this.invoiceParams.pageNumber !== event){
    this.invoiceParams.pageNumber = event;
    this.getInvoices();
    }
  }

  onClick(invoiceId: number ) {
    this.adminService.getInvoice(invoiceId).subscribe(response => {
      
      this.router.navigateByUrl("admin/invoices/" + invoiceId);
    });
  }

  onUpdateClick(invoiceId: number){
   
  

    this.adminService.getInvoice(invoiceId).subscribe((response: IInvoice) => {
    this.invoiceToUpdate = response;

    this.invoiceService.invoiceToUpdate = response;
   
    })

    
    this.invoiceService.isUpdate = true;
    this.router.navigateByUrl("admin/add-new-invoice/" + invoiceId);
  }

  onAddNewInvoiceClick(){
    this.invoiceService.isUpdate = false;
    this.router.navigateByUrl("admin/add-new-invoice/");
  }
}
