import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-request-service-call',
  templateUrl: './request-service-call.component.html',
  styleUrls: ['./request-service-call.component.scss']
})
export class RequestServiceCallComponent implements OnInit {
  @Input() repairRequestForm: FormGroup;
  loading = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
