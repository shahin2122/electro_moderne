import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { IInvoice, IInvoiceItem, Invoice, InvoiceItem } from 'src/app/shared/models/invoice';
import { environment } from 'src/environments/environment';
import { AdminService } from '../admin.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
baseUrl = environment.baseApiUrl;
invoiceToAdd = new Invoice();
invoiceToUpdate = new Invoice();

itemToAdd = new InvoiceItem();
itemToUpdate = new InvoiceItem();

isUpdate = false;

  constructor(private http: HttpClient) { }

  updateInvoice(){
    return this.http.put<IInvoice>(this.baseUrl + 'invoice/update/' + this.invoiceToUpdate.id, this.invoiceToUpdate);
  }


  updateInvoiceItem( model: IInvoiceItem){


    model.id = this.itemToUpdate.id;
    model.invoiceId = this.itemToUpdate.invoiceId;
    model.invoice = this.itemToUpdate.invoice;

    console.log( model);
    console.log( this.itemToUpdate);

    return this.http.put<IInvoiceItem>(this.baseUrl + "invoice/update-item/" + this.itemToUpdate.id , model);
  }

  getItemsForInvoice(invoiceId: number){
    return this.http.get<IInvoiceItem[]>(this.baseUrl + "invoice/items/" + invoiceId); 
  }

  addNewItem( ){
    this.itemToAdd.invoiceId = this.invoiceToUpdate.id;

    return this.http.post<IInvoiceItem>(this.baseUrl + "invoice/add-item", this.itemToAdd);
  }
  
}
