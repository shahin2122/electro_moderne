import {v4 as uuidv4} from 'uuid'

export interface IBasket {
    id: string;
    productItems: IBasketProductItem[];
    partItems: IBasketPartItem[];
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
}

export interface IBasketTotals {
    shipping: number;
    subtotal: number;
    total: number;
}