import EventInterface from "./event.interface";
import EventHandlerInterface from "./event.handler.interface";

export default interface EventDispatcherInterface {
    notify(event: EventInterface): void;

    register(eventName: string, eventHandler: EventHandlerInterface): void;

    unregister(eventName: string, eventHandler: EventHandlerInterface): void;

    unregisterEvent(eventName: string): void;

    unregisterAll(): void;

    get EventHandlers(): { [eventName: string]: EventHandlerInterface[] }
}