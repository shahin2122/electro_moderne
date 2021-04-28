import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDaysAvailable, IPaymentMethods, IRepairRequest } from '../shared/models/repairRequest';
import { RepairRequestService } from './repair-request.service';

@Component({
  selector: 'app-repair-request',
  templateUrl: './repair-request.component.html',
  styleUrls: ['./repair-request.component.scss']
})
export class RepairRequestComponent implements OnInit {
repairRequestForm: FormGroup;
request: IRepairRequest;
days: IDaysAvailable[] ;
paymentMethods: IPaymentMethods[] ;

  constructor(private requestService: RepairRequestService,private router: Router,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();

  }

  initializeForm(){
    this.repairRequestForm = this.fb.group({

      addressForm: this.fb.group({
      FullName: [null, Validators.required],
      PhoneNumber: [null, Validators.required],
      CustomerEmail: [null, Validators.required],
      Address: [null, Validators.required],
      City: [null,  Validators.required],
      PostalCode: [null, Validators.required],
      }),
      
      productForm: this.fb.group({
        ProductType: [null, Validators.required],
        ProductBrand: [null, Validators.required],
        ProblemInfo: [null, Validators.required],
      }),
      
      daysForm: this.fb.group({
        DaysAvailability: [null, Validators.required],
      }),

      paymentForm: this.fb.group({
        PaymentMethods: [null, Validators.required],
      }),
      
      serviceCallForm: this.fb.group({
        AcceptServiceFee: [null, Validators.required],
        IsEmergency: [null],
      }),
      

    });
  }

 
}
