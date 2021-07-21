export interface ICustomer {
    id: number;
    email: string;
    appliance: string;
    brand: string;
    requestedService: string;
    address: string;
    city: string;
    postalCode: string;
    fullName: string;
    phoneNumber: string;
    modelNumber: string;
    registeredDate: string;
    invoices: string[];
}