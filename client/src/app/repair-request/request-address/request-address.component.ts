import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RepairRequestService } from '../repair-request.service';

@Component({
  selector: 'app-request-address',
  templateUrl: './request-address.component.html',
  styleUrls: ['./request-address.component.scss']
})
export class RequestAddressComponent implements OnInit {
  @Input() repairRequestForm: FormGroup;
 
  constructor(private repairRequestService: RepairRequestService) { }

  ngOnInit(): void {
  }

  onFinish(){

    this.repairRequestService.setAddress(this.repairRequestForm.get('addressForm').value);
    
  }

}
