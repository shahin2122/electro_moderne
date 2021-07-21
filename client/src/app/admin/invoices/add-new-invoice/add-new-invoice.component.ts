
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ICustomer } from 'src/app/shared/models/customer';
import { CustomerParams } from 'src/app/shared/models/customerParams';
import { IInvoice, IInvoiceItem } from 'src/app/shared/models/invoice';
import { AdminService } from '../../admin.service';
import { InvoiceService } from '../invoice.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-new-invoice',
  templateUrl: './add-new-invoice.component.html',
  styleUrls: ['./add-new-invoice.component.scss']
})
export class AddNewInvoiceComponent implements OnInit {
  @ViewChild('search', {static: false}) searchTerm: ElementRef
  workPerformedForm: FormGroup;
  AddItemsForm: FormGroup;
  items: IInvoiceItem[] = [];
  customers: ICustomer[];
  selectedCustomer: ICustomer;
  customerParams = new CustomerParams();
  totalCount:number;
  todayDate = new Date();
  invoice: IInvoice;
  serviceCallFee = 89.95;
  step1= true;
  step2= false;
  step3= false;
  isUpdate = false;
  isItemUpdate = false;

 constructor(private adminService: AdminService, private router: Router,private invoiceService: InvoiceService
  ,private toastr: ToastrService,private fb:FormBuilder, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCustomers();
    this.initializeForm();

    if(this.invoiceService.isUpdate)
    {
      this.isUpdate = true;
    }
  }


  initializeForm(){
    this.AddItemsForm = this.fb.group({
      name: [null, Validators.required],
      price: [null, Validators.required],
      quantity: [null, Validators.required],
      
    })

    this.workPerformedForm = this.fb.group({
      workPerformed: [null, Validators.required],
      appliance: [null],
      modelNumber: [null]
    })
   
  }

  onItemUpdate(item: IInvoiceItem){
    this.invoiceService.itemToUpdate = item;

    this.isItemUpdate = true;

    this.AddItemsForm.get("name").patchValue(item.name);
    this.AddItemsForm.get("price").patchValue(item.price);
    this.AddItemsForm.get("quantity").patchValue(item.quantity);
  }

  ItemUpdateSubmit(){
    this.invoiceService.updateInvoiceItem(this.AddItemsForm.value).subscribe(response => {
      console.log(response);
      this.isItemUpdate = false;
      this.refreshItems();
      this.AddItemsForm.reset();
    })
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

  onClick(customerId: number){
    let customer: ICustomer;

    customer = this.customers.find(x => x.id === customerId);

    this.selectedCustomer = customer;

    this.invoiceService.invoiceToAdd.customer = customer;
    this.invoiceService.invoiceToAdd.customerId = customerId;

    this.step1 = false;
    this.step2 = true;


  }

  refreshItems(){
 
   this.invoiceService.getItemsForInvoice(this.invoiceService.invoiceToUpdate.id).subscribe(response => {
     this.invoiceService.invoiceToUpdate.items = response;
     this.items = response;
   })
  }

  loadItems(){
    this.items = this.invoiceService.invoiceToUpdate.items;
  }

  onUpdateClick(customerId: number){
    let customer : ICustomer;

    customer = this.customers.find(x => x.id === customerId);

    this.selectedCustomer = customer;

    this.invoiceService.invoiceToUpdate.customer = this.selectedCustomer;
    this.invoiceService.invoiceToUpdate.customerId = this.selectedCustomer.id;
    
    this.loadItems();
    this.patchValues();

    this.step1 = false;
    this.step2 = true;
  }

  onSkipCustomer(){

    this.adminService.getCustomer(this.invoiceService.invoiceToUpdate.customerId).subscribe(response => {
      this.selectedCustomer = response;
      this.invoiceService.invoiceToUpdate.customer = response;

      this.loadItems();
      this.patchValues();
    })

    this.step1 = false;
    this.step2 = true;
  }

  patchValues(){
    this.workPerformedForm.get("appliance").patchValue(this.invoiceService.invoiceToUpdate.appliance);
    this.workPerformedForm.get("modelNumber").patchValue(this.invoiceService.invoiceToUpdate.modelNumber);
    this.workPerformedForm.get("workPerformed").patchValue(this.invoiceService.invoiceToUpdate.workPerformed);
  }


  backToStep1(){
    this.selectedCustomer = null;
    this.items = [];
    this.step2 = false;
    this.step1 = true;
  }

  addItem(){
    let item: IInvoiceItem;
    item = this.AddItemsForm.value;
    this.items.push(item);

    if(this.isUpdate){
      this.invoiceService.itemToAdd = item;
      this.invoiceService.addNewItem().subscribe(response => {
        console.log(response);
      })
    }

    this.AddItemsForm.reset();
    
  }

  goToStep3(){
    this.step2 = false;
    this.step3 = true;

    if(this.isUpdate){

      this.invoiceService.invoiceToUpdate.appliance = this.workPerformedForm.get("appliance").value;
      this.invoiceService.invoiceToUpdate.modelNumber = this.workPerformedForm.get("modelNumber").value;
      this.invoiceService.invoiceToUpdate.workPerformed = this.workPerformedForm.get("workPerformed").value;
      this.CalculateUpdateTotals();

    }else {
      this.invoiceService.invoiceToAdd.appliance = this.workPerformedForm.get("appliance").value;
      this.invoiceService.invoiceToAdd.modelNumber = this.workPerformedForm.get("modelNumber").value;
      this.invoiceService.invoiceToAdd.workPerformed = this.workPerformedForm.get("workPerformed").value;
  
      this.calculateTotals();
  

    }

   
  }

  calculateTotals(){
    this.invoiceService.invoiceToAdd.items = this.items;

    const subtotal = this.items.reduce((a,b) => (b.price * b.quantity) + a, 0) + this.serviceCallFee;
    const tps5 = (subtotal * 5) / 100;
    const tvq9975 = (subtotal * 9.975) / 100;
    const total = subtotal + tps5 + tvq9975;

    this.invoiceService.invoiceToAdd.total = total;
    this.invoiceService.invoiceToAdd.tps5 = tps5;
    this.invoiceService.invoiceToAdd.tvq9975 = tvq9975;
    this.invoiceService.invoiceToAdd.subTotal = subtotal;
    
    this.invoice = this.invoiceService.invoiceToAdd;

    console.log(this.invoice);
  }

  CalculateUpdateTotals(){
    this.invoiceService.invoiceToUpdate.items = this.items;

    const subtotal = this.items.reduce((a,b) => (b.price * b.quantity) + a, 0) + this.serviceCallFee;
    const tps5 = (subtotal * 5) / 100;
    const tvq9975 = (subtotal * 9.975) / 100;
    const total = subtotal + tps5 + tvq9975;

    this.invoiceService.invoiceToUpdate.total = total;
    this.invoiceService.invoiceToUpdate.tps5 = tps5;
    this.invoiceService.invoiceToUpdate.tvq9975 = tvq9975;
    this.invoiceService.invoiceToUpdate.subTotal = subtotal;
    
    this.invoice = this.invoiceService.invoiceToUpdate;

  }

  submitNewInvoice(){
    this.adminService.addNewInvoice().subscribe((response :IInvoice)=> {
      this.toastr.success("new invoice added successfully");
      this.router.navigateByUrl("admin/invoices");
    }, error => {
      console.log(error);
      this.toastr.error(error.message);
    });
  }

  submitInvoiceUpdate(){
    this.invoiceService.updateInvoice().subscribe(response => {
      this.toastr.success("invoice updated successfully");
      this.router.navigateByUrl("admin/invoices");
    }, error => {
      console.log(error);
      this.toastr.error(error.message);
    });
  }
}
