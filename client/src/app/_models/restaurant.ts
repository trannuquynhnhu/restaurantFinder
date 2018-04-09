import { Address } from "./address";

export class Restaurant {
    constructor(public _id: string, public name: string, 
        public address: Address, public rating: number,
        public location?:number[], public dishes?:string[], public reviews?: Review[]) {}
}

export class Review {
    constructor(public username: string, public comment: string, public rating: number) {}
}