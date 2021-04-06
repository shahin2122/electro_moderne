import { IAddress } from "./address";

export interface IOrderToCreate {
    basketId: string;
    deliveryMethodId: number;
    shipToAddress: IAddress;
}

export interface IOrder {
    id: number;
    buyerEmail: string;
    orderDate: string;
    shippingToAddress: IAddress;
    deliveryMethod: string;
    shippingPrice: number;
    items: IOrderItem[];
    subtotal: number;
    total: number;
    status: string;
}

export interface IOrderItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    photoUrl: string;
    type: string;
    brand: string;
}


