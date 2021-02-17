import { product } from "./product";

export interface pagination{
    pageIndex: number;
    pageSize: number;
    count: number;
    data: product[];
}