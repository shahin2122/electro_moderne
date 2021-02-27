import { Photo } from "./photo";

export interface product {
    id: number;
    name: string;
    description: string;
    price: number;
    photoUrl: string;
    productType: string;
    productBrand: string;
    localId: string;
    specs: string;
    photos: Photo[];

}

