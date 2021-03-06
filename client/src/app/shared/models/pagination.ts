import { product } from "./product";

export interface IPagination{
    pageIndex: number;
    pageSize: number;
    count: number;
    data: any[];
}