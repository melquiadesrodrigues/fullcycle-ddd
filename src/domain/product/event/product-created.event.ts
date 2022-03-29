import EventInterface from "../../@shared/event/event.interface";

type ProductCreatedEventCreationAttributes = {
    name: string,
    description: string,
    price: number,
}

export default class ProductCreatedEvent implements EventInterface {
    dataTimeOccurred: Date;
    eventData: ProductCreatedEventCreationAttributes;

    constructor(eventData: ProductCreatedEventCreationAttributes) {
        this.dataTimeOccurred = new Date();
        this.eventData = eventData;
    }
}