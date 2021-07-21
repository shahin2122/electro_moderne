import { ICustomer } from "./customer";


export interface IInvoice {
    id: number;
    customer: ICustomer;
    customerId: number;
    Date: string;
    workPerformed: string;
    appliance: string;
    modelNumber: string;
    subTotal: number;
    tps5: number;
    tvq9975: number;
    items: IInvoiceItem[];
    total: number;
    submitter: string;
}

export interface IInvoiceItem {
    id: number;
    invoice: IInvoice;
    invoiceId: number;
    name: string;
    price: number;
    quantity: number;
}

export class InvoiceItem {
    id: number;
    invoice: IInvoice;
    invoiceId: number;
    name: string;
    price: number;
    quantity: number;
}

export class Invoice implements IInvoice {
    id: number;
    customer : ICustomer;
    customerId: number;
    Date : string;
    workPerformed : string;
    subTotal: number;
    tps5: number;
    tvq9975: number;
    items: IInvoiceItem[] = [];
    total: number;
    appliance: string;
    modelNumber: string;
    submitter: string;
}