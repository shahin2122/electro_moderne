export interface IRepairRequest{
    id: number;
    productInfo: string;
    address: string;
    status: string;
    requestDate: string;
    daysAvailability: IDaysAvailable[];
    paymentMethods: IPaymentMethods[];
    repairmanTask: string;
    subtoTal: number;
    total: number;
    acceptedServiceCall: boolean;
    reasonToReject: string;
    customerEmail: string;
    city: string;
    postalCode: string;
    fullName: string;
    phoneNumber: string;
    productType: string;
    productBrand: string;
    problemInfo: string;
    workPerformed: string;
    repairmanId: number;
    price: number;
    isEmergency: boolean;
    
}

export interface IDaysAvailable {
    id: number;
    name:string;
}

export interface IPaymentMethods {
    id: number;
    name:string;
}
