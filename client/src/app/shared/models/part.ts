import { IPartPhoto } from './PartPhoto'

export interface IPart {
    id: number;
    name: string;
    description: string;
    price: number;
    photoUrl: string;
    partType: string;
    partBrand: string;
    localId: string;
    specs: string;
    photos: IPartPhoto[];
    partNumber: string;
    manufacturer: string;
}