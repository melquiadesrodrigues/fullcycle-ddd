export default class Address {
    
    private readonly _street: string = "";
    private readonly _number: number = 0;
    private readonly _zip: string = "";
    private readonly _city: string = "";

    constructor(street: string, number: number, zip: string, city: string) {
        this._street = street;
        this._number = number;
        this._zip = zip;
        this._city = city;
        this.validate();
    }

    private validate() {
        if (this._street.length === 0) {
            throw new Error("Street is required");
        }
        if (this._number === 0) {
            throw new Error("Number is required");
        }
        if (this._zip.length === 0) {
            throw new Error("Zip code is required");
        }
        if (this._city.length === 0) {
            throw new Error("City is required");
        }
    }

    toString(): string {
        return `${this._number} ${this._street}, ${this._city}, ${this._zip}`;
    }
}