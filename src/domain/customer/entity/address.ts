export default class Address {
    
    private readonly _street: string = "";
    private readonly _number: number = 0;
    private readonly _zipcode: string = "";
    private readonly _city: string = "";

    constructor(street: string, number: number, zipcode: string, city: string) {
        this._street = street;
        this._number = number;
        this._zipcode = zipcode;
        this._city = city;
        this.validate();
    }

    get street(): string {
        return this._street;
    }

    get number(): number {
        return this._number;
    }

    get zipcode(): string {
        return this._zipcode;
    }

    get city(): string {
        return this._city;
    }

    private validate() {
        if (this._street.length === 0) {
            throw new Error("Street is required");
        }
        if (this._number === 0) {
            throw new Error("Number is required");
        }
        if (this._zipcode.length === 0) {
            throw new Error("Zip code is required");
        }
        if (this._city.length === 0) {
            throw new Error("City is required");
        }
    }

    toString(): string {
        return `${this._number} ${this._street}, ${this._city}, ${this._zipcode}`;
    }
}