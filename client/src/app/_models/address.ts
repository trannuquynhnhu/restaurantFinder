export class Address {
    constructor(public street: string, public city: string, public state: string, public zipcode: string) {

    }
    get fullAddress(): string {
        let arr = [];
        if (this.street) arr.push(this.street);
        if (this.city) arr.push(this.city);
        if (this.state) arr.push(this.state);
        if (this.zipcode) arr.push(this.zipcode);
        return arr.join(',');
    }
}