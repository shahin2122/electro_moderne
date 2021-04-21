import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-request-product',
  templateUrl: './request-product.component.html',
  styleUrls: ['./request-product.component.scss']
})
export class RequestProductComponent implements OnInit {
  @Input() repairRequestForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

}
