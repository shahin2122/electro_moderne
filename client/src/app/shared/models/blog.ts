import { IBlogPhoto } from "./blogPhoto";


export interface IBlog {
    id:number;
    title:string;
    createdTime:string;
    rawText:string;
    text:string;
    photo:IBlogPhoto;
    tags:string;
    photoUrl:string;
}