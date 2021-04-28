import {v4 as uuidv4} from 'uuid'

export interface IBasket {
    id: string;
    productItems: IBasketProductItem[];
    partItems: IBasketPartItem[];
    deliveryMethodId: number;
    shippingPrice: number;
    paymentIntentId: string;
    clientSecret: string;
}

export interface IBasketProductItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    photoUrl: string;
    brand: string;
    type: string;
}

export interface IBasketPartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    photoUrl: string;
    brand: string;
    type: string;
    partNumber: string;
}

export class Basket implements IBasket {
    id = uuidv4();
    productItems: IBasketProductItem[] = [];
    partItems: IBasketPartItem[] = [];
    deliveryMethodId: number;
    shippingPrice: number;
    paymentIntentId: string;
    clientSecret: string;
}

export interface IBasketTotals {
    shipping: number;
    subtotal: number;
    total: number;
    tps5: number;
    tvq9975: number;
    totalTaxed: number;
}