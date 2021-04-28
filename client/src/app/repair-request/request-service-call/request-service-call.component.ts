import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IRepairRequest } from 'src/app/shared/models/repairRequest';
import { RepairRequestService } from '../repair-request.service';

@Component({
  selector: 'app-request-service-call',
  templateUrl: './request-service-call.component.html',
  styleUrls: ['./request-service-call.component.scss']
})
export class RequestServiceCallComponent implements OnInit {
  @Input() repairRequestForm: FormGroup;
  loading = false;
  
  constructor(private requestService: RepairRequestService,private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.requestService.submitNewRepairRequest(this.repairRequestForm.value).subscribe(
      (response: IRepairRequest) =>{
      this.router.navigateByUrl("/request-submitted");
    }, error => {
      console.log(error);
    })
  }
}
