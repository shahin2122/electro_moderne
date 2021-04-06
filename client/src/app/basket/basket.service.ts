 
  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { BehaviorSubject } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { environment } from 'src/environments/environment';
  import { Basket, IBasket , IBasketPartItem, IBasketProductItem, IBasketTotals} from '../shared/models/basket';
  import { IDeliveryMethod } from '../shared/models/delivery';
  import { IPart } from '../shared/models/part';
  import { product } from '../shared/models/product';
  
  @Injectable({
    providedIn: 'root'
  })
  export class BasketService {
    baseUrl = environment.baseApiUrl;
    private basketSource = new BehaviorSubject<IBasket>(null);
    basket$ = this.basketSource.asObservable();
    private basketTotalSource = new BehaviorSubject<IBasketTotals>(null);
    basketTotal$ = this.basketTotalSource.asObservable();
    shipping = 0;
  
    constructor(private http: HttpClient) { }
  

    createPaymentIntent() {
      return this.http.post(this.baseUrl + 'payments/' + this.getCurrentBasketValue().id, {})
      .pipe(
        map((basket: IBasket) => {
          this.basketSource.next(basket);
         
        })
      );
    }
  
    setShippingPrice(deliveryMethod: IDeliveryMethod) {
      this.shipping = deliveryMethod.price;
      const basket = this.getCurrentBasketValue();
      basket.deliveryMethodId = deliveryMethod.id;
      basket.shippingPrice = deliveryMethod.price;
      this.calculateTotals();
      this.setBasket(basket);
    }
  

    
    getBasket(id: string) {
      return this.http.get(this.baseUrl + 'basket?id=' + id)
        .pipe(
          map((basket: IBasket) => {
            this.basketSource.next(basket);
            this.calculateTotals();
          })
        );
    }
  
    setBasket(basket: IBasket) {
      return this.http.post(this.baseUrl + 'basket', basket).subscribe((response: IBasket) => {
        this.basketSource.next(response);
        this.calculateTotals();
      }, error => {
        console.log(error);
      });
    }
  
  
  
    incrementProductItemQuantity(item: IBasketProductItem) {
      const basket = this.getCurrentBasketValue();
      const foundItemIndex = basket.productItems.findIndex(x => x.id === item.id);
      basket.productItems[foundItemIndex].quantity++;
      this.setBasket(basket);
    }
  
    incrementPartItemQuantity(item: IBasketPartItem) {
      const basket = this.getCurrentBasketValue();
      const foundItemIndex = basket.partItems.findIndex(x => x.id === item.id);
      basket.partItems[foundItemIndex].quantity++;
      this.setBasket(basket);
    }
  
    decrementProductItemQuantity(item: IBasketProductItem) {
      const basket = this.getCurrentBasketValue();
      const foundItemIndex = basket.productItems.findIndex(x => x.id === item.id);
      if(basket.productItems[foundItemIndex].quantity > 1) {
        basket.productItems[foundItemIndex].quantity--;
        this.setBasket(basket);
      }else {
        this.removeProductItemFromBasket(item);
      }
     
    }
  
    removeProductItemFromBasket(item: IBasketProductItem) {
      const basket = this.getCurrentBasketValue();
      if(basket.productItems.some(x => x.id === item.id)) {
        basket.productItems = basket.productItems.filter(i => i.id !== item.id);
        if(basket.productItems.length > 0) {
          this.setBasket(basket);
        } else{
          if(basket.partItems.length > 0) {
            basket.productItems = [];
            this.setBasket(basket);
          }else {
            this.deleteBasket(basket);
          }
        }
      }
      }
  
      decrementPartItemQuantity(item: IBasketPartItem) {
        const basket = this.getCurrentBasketValue();
        const foundItemIndex = basket.partItems.findIndex(x => x.id === item.id);
        if(basket.partItems[foundItemIndex].quantity > 1) {
          basket.partItems[foundItemIndex].quantity--;
          this.setBasket(basket);
        }else {
          this.removePartItemFromBasket(item);
        }
       
      }
  
      removePartItemFromBasket(item: IBasketPartItem) {
        const basket = this.getCurrentBasketValue();
        if(basket.partItems.some(x => x.id === item.id)) {
          basket.partItems = basket.partItems.filter(i => i.id !== item.id);
          if(basket.partItems.length > 0) {
            this.setBasket(basket);
          } else{
            if(basket.productItems.length > 0) {
              basket.partItems = [];
              this.setBasket(basket);
            }else {
              this.deleteBasket(basket);
            }
          }
        }
        }
  
    deleteLocalBasket(id: string) {
      this.basketSource.next(null);
      this.basketTotalSource.next(null);
      localStorage.removeItem('basket_id');
    }
  
    deleteBasket(basket: IBasket) {
      return this.http.delete(this.baseUrl + 'basket?id=' + basket.id).subscribe(() => {
        this.basketSource.next(null);
        this.basketTotalSource.next(null);
        localStorage.removeItem('basket_id');
      }, error => {
        console.log(error);
      });
    }
  
    getCurrentBasketValue() {
      return this.basketSource.value;
    }
  
    addProductItemToBasket(item: product, quantity = 1) {
      const itemToAdd: IBasketProductItem = this.mapProductItemToBasketItem(item, quantity);
      const basket = this.getCurrentBasketValue() ?? this.createBasket();
      basket.productItems = this.addOrUpdateProductItem(basket.productItems, itemToAdd, quantity);
      this.setBasket(basket);
    }
  
    addPartItemToBasket(item: IPart, quantity = 1) {
      const itemToAdd: IBasketPartItem = this.mapPartItemToBasketItem(item, quantity);
      const basket = this.getCurrentBasketValue() ?? this.createBasket();
      basket.partItems = this.addOrUpdatePartItem(basket.partItems, itemToAdd, quantity);
      this.setBasket(basket);
    }
  
    private mapProductItemToBasketItem(item: product, quantity: number) {
      return {
        id: item.id,
        name: item.name,
        price: item.price,
        photoUrl: item.photoUrl,
        quantity,
        brand: item.productBrand,
        type: item.productType
      };
    }
  
    private mapPartItemToBasketItem(item: IPart, quantity: number) {
      return {
        id: item.id,
        name: item.name,
        price: item.price,
        photoUrl: item.photoUrl,
        quantity,
        brand: item.partBrand,
        type: item.partType,
        partNumber: item.partNumber
      };
    }
  
    private createBasket(): IBasket {
      const basket = new Basket();
      localStorage.setItem('basket_id', basket.id);
      return basket;
    }
  
    private addOrUpdateProductItem(items: IBasketProductItem[], itemToAdd: IBasketProductItem, quantity: number)
    :IBasketProductItem[] {
      const index = items.findIndex(i => i.id === itemToAdd.id);
      if(index === -1) {
        itemToAdd.quantity = quantity;
        items.push(itemToAdd);
      } else {
        items[index].quantity += quantity;
      }
      return items;
    }
  
    
    private addOrUpdatePartItem(items: IBasketPartItem[], itemToAdd: IBasketPartItem, quantity: number)
    :IBasketPartItem[] {
      const index = items.findIndex(i => i.id === itemToAdd.id);
      if(index === -1) {
        itemToAdd.quantity = quantity;
        items.push(itemToAdd);
      } else {
        items[index].quantity += quantity;
      }
      return items;
    }
  
    private calculateTotals() {
      const basket = this.getCurrentBasketValue();
      const shipping = this.shipping;
      const subtotal = (basket.partItems.reduce((a, b) => (b.price * b.quantity) + a, 0)) + (basket.productItems.reduce((a, b) => (b.price * b.quantity) + a, 0));
      const total = subtotal + shipping;
      this.basketTotalSource.next({shipping, total, subtotal});
    }
  }


