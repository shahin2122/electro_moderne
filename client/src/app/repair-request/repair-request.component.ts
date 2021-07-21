import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../admin/admin.service';
import { ICustomer } from '../shared/models/customer';
import { IRepairRequest } from '../shared/models/repairRequest';
import { RepairRequestService } from './repair-request.service';

@Component({
  selector: 'app-repair-request',
  templateUrl: './repair-request.component.html',
  styleUrls: ['./repair-request.component.scss']
})
export class RepairRequestComponent implements OnInit {
repairRequestForm: FormGroup;
request: IRepairRequest;
days: string[] ;
paymentMethods: string[] ;


  constructor(private requestService: RepairRequestService,private router: Router, private adminService: AdminService,
    private fb:FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initializeForm();

  }

  initializeForm(){
    this.repairRequestForm = this.fb.group({

     
      FullName: [null, Validators.required],
      PhoneNumber: [null, Validators.required],
      CustomerEmail: [null, Validators.required],
      Address: [null, Validators.required],
      City: [null,  Validators.required],
      PostalCode: [null, Validators.required],
      
        ProductType: [null, Validators.required],
        ProductBrand: [null, Validators.required],
        ProblemInfo: [null, Validators.required],

     
        DaysAvailability: [null, Validators.required],

        PaymentMethods: [null, Validators.required],
      

        AcceptServiceFee: [null, Validators.required],
     
      

    });
  }

  onSubmit(){
    this.requestService.submitNewRepairRequest(this.repairRequestForm.value).subscribe(
      (response:IRepairRequest) => {
      console.log("response is =" + response);
      
      this.toastr.success("New Request Submited");
      this.router.navigateByUrl("/repair-request-submitted");
    }, error => {
      console.log(error);
      this.toastr.error(error.message);
    })

    
  }
 
  

}
