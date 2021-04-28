import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasketTotals } from '../../models/basket';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.scss']
})
export class OrderTotalsComponent implements OnInit {
 
 @Input() shippingPrice: number;
 @Input() subTotal: number;
 @Input() total: number;
 @Input() tps5: number;
 @Input() tvq9975: number;
 @Input() totalTaxed: number;


  constructor() { }

  ngOnInit(): void {
    
  }

}
