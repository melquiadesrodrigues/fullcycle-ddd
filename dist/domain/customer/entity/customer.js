"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Customer {
    constructor(id, name) {
        this._name = "";
        this._active = false;
        this._rewardPoints = 0;
        this._id = id;
        this._name = name;
        this.validate();
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get address() {
        return this._address;
    }
    get rewardPoints() {
        return this._rewardPoints;
    }
    changeName(name) {
        this._name = name;
        this.validate();
    }
    changeAddress(address) {
        this._address = address;
    }
    activate() {
        if (!this._address) {
            throw new Error("Address is mandatory to activate a customer");
        }
        this._active = true;
    }
    deactivate() {
        this._active = false;
    }
    isActive() {
        return this._active;
    }
    addRewardPoints(rewardPoints) {
        this._rewardPoints += rewardPoints;
    }
    validate() {
        if (this._id.length === 0) {
            throw new Error("Id is required");
        }
        if (this._name.length === 0) {
            throw new Error("Name is required");
        }
    }
}
exports.default = Customer;
