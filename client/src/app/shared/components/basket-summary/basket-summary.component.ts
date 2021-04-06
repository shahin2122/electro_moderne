import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket, IBasketPartItem, IBasketProductItem } from '../../models/basket';
import {IOrderItem} from '../../models/Order';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss']
})
export class BasketSummaryComponent implements OnInit {
 
  @Output() decrementProduct: EventEmitter<IBasketProductItem> = new EventEmitter<IBasketProductItem>();
  @Output() incrementProduct: EventEmitter<IBasketProductItem> = new EventEmitter<IBasketProductItem>();
  @Output() removeProduct: EventEmitter<IBasketProductItem> = new EventEmitter<IBasketProductItem>();
  @Output() decrementPart: EventEmitter<IBasketPartItem> = new EventEmitter<IBasketPartItem>();
  @Output() incrementPart: EventEmitter<IBasketPartItem> = new EventEmitter<IBasketPartItem>();
  @Output() removePart: EventEmitter<IBasketPartItem> = new EventEmitter<IBasketPartItem>();
  @Input() isBasket = true;
  @Input() isOrder = false;
  @Input() productItems: IBasketProductItem[] = [];
  @Input() partItems: IBasketPartItem[]  = []; 
  @Input() orderItems: IOrderItem[] = [];

  constructor() {

   }
p
  ngOnInit(): void {

  }

  decrementProductItemQuantity(item: IBasketProductItem) {
    this.decrementProduct.emit(item);
  }

  incrementProductItemQuantity(item: IBasketProductItem) {
    this.incrementProduct.emit(item);
  }

  removeBasketProductItem(item: IBasketProductItem) {
    this.removeProduct.emit(item);
  }

  decrementPartItemQuantity(item: IBasketPartItem) {
    this.decrementPart.emit(item);
  }

  incrementPartItemQuantity(item: IBasketPartItem) {
    this.incrementPart.emit(item);
  }

  removeBasketPartItem(item: IBasketPartItem) {
    this.removePart.emit(item);
  }
  
}
