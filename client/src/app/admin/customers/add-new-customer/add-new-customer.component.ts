import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ICustomer } from 'src/app/shared/models/customer';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-add-new-customer',
  templateUrl: './add-new-customer.component.html',
  styleUrls: ['./add-new-customer.component.scss']
})
export class AddNewCustomerComponent implements OnInit {
 AddNewCustomerForm: FormGroup;
 customer: ICustomer;
 isUpdate = false;


  constructor(private adminService: AdminService,private router: Router,private fb:FormBuilder,
     private toastr: ToastrService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.initializeForm();

    if(this.activatedRoute.snapshot.paramMap.get('id') )
    {
      this.isUpdate = true;
      this.adminService.getCustomer(Number(this.activatedRoute.snapshot.paramMap.get('id')))
        .subscribe(response => {
          this.customer = response;
          this.AddNewCustomerForm.get("FullName").patchValue(this.customer.fullName);
          this.AddNewCustomerForm.get("PhoneNumber").patchValue(this.customer.phoneNumber);
          this.AddNewCustomerForm.get("ModelNumber").patchValue(this.customer.modelNumber);
          this.AddNewCustomerForm.get("Email").patchValue(this.customer.email);
          this.AddNewCustomerForm.get("Address").patchValue(this.customer.address);
          this.AddNewCustomerForm.get("City").patchValue(this.customer.city);
          this.AddNewCustomerForm.get("PostalCode").patchValue(this.customer.postalCode);
          this.AddNewCustomerForm.get("Appliance").patchValue(this.customer.appliance);
          this.AddNewCustomerForm.get("Brand").patchValue(this.customer.brand);
          this.AddNewCustomerForm.get("RequestedService").patchValue(this.customer.requestedService);

        })
    }
  }

  initializeForm(){
    this.AddNewCustomerForm = this.fb.group({
      FullName: [null, Validators.required],
      PhoneNumber: [null, Validators.required],
      ModelNumber: [null, Validators.required],
      Email: [null, Validators.required],
      Address: [null, Validators.required],
      City: [null,  Validators.required],
      PostalCode: [null, Validators.required],
      Appliance: [null, Validators.required],
      Brand: [null, Validators.required],
      RequestedService: [null, Validators.required],
    });
  }


  onSubmit(){
    if(this.isUpdate)
    {
      this.adminService.updateCustomer(this.customer.id , this.AddNewCustomerForm.value)
        .subscribe(() => {
          this.toastr.success("Customer Editted Successfully");
          this.router.navigateByUrl("admin/customers");
        }, error => {
          console.log(error);
          this.toastr.error(error.message);
        })
    } else {

      this.adminService.addNewCustomer(this.AddNewCustomerForm.value).subscribe(
        (response: ICustomer) => {
          this.toastr.success("New Customer Added");
          this.router.navigateByUrl("/admin/customers");
        }, error => {
          console.log(error);
          this.toastr.error(error.message);
        })
    }

  }
}
