import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketPartItem, IBasketProductItem } from '../shared/models/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
 basket$: Observable<IBasket>;
 
  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  removeBasketProductItem(item: IBasketProductItem) {
    this.basketService.removeProductItemFromBasket(item);
  }

  removeBasketPartItem(item: IBasketPartItem) {
    this.basketService.removePartItemFromBasket(item);
  }

  incrementProductItemQuantity(item: IBasketProductItem) {
    this.basketService.incrementProductItemQuantity(item);
  }

  incrementPartItemQuantity(item: IBasketPartItem) {
    this.basketService.incrementPartItemQuantity(item);
  }

  decrementProductItemQuantity(item: IBasketProductItem) {
    this.basketService.decrementProductItemQuantity(item);
  }

  decrementPartItemQuantity(item: IBasketPartItem) {
    this.basketService.decrementPartItemQuantity(item);
  }
}
