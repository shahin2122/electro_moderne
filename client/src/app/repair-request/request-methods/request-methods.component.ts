import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDaysAvailable, IPaymentMethods } from 'src/app/shared/models/repairRequest';
import { RepairRequestService } from '../repair-request.service';

@Component({
  selector: 'app-request-methods',
  templateUrl: './request-methods.component.html',
  styleUrls: ['./request-methods.component.scss']
})
export class RequestMethodsComponent implements OnInit {
  @Input() repairRequestForm: FormGroup;
  paymentMethods: IPaymentMethods[];
  paymentsSelected: IPaymentMethods[] = [];

  constructor(private requestService: RepairRequestService) { }

  ngOnInit(): void {
    this.getPaymenMethods();
  }

  getPaymenMethods(){
    this.requestService.getPaymentMethods().subscribe(response => {
      this.paymentMethods = response;
      console.log(response);
    })

}

 onClicked(method: IPaymentMethods){
   let methods = this.paymentsSelected;
   if(methods.some(x => x.id === method.id)){
     methods = methods.filter(i => i.id !== method.id);
    
   }else{
     methods.push(method);

   }
   this.paymentsSelected = methods;
   console.log(this.paymentsSelected);
 }
}