import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICustomer } from 'src/app/shared/models/customer';
import { IInvoice, IInvoiceItem, Invoice } from 'src/app/shared/models/invoice';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss']
})
export class InvoiceDetailsComponent implements OnInit {

Invoice = new Invoice();

  constructor(private adminService: AdminService, private activatedRouted: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadInvoice();
    console.log(this.Invoice);
  }

  loadInvoice(){
    this.adminService.getInvoice(+this.activatedRouted.snapshot.paramMap.get('id'))
      .subscribe((response: IInvoice)=> {
        this.Invoice = response;
        console.log(response);
        
        this.adminService.getCustomer(this.Invoice.customerId).subscribe((response: ICustomer) => {
          this.Invoice.customer = response;
        })

        console.log("invoice ="+this.Invoice);
      })

      
      
  }
}
