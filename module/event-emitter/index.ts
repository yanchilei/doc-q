import { DocQ } from "../doc";

export type EventName = keyof EventTypeMap;

export interface EventTypeMap {
  'click': MouseEvent,
  'keydown': KeyboardEvent,
  'keyup': KeyboardEvent,
  'editablechange': boolean,
  'selectionchange': Selection
}

export class EventEmitter {

  private listeners: Map<EventName, ((doc: DocQ, e: EventTypeMap[EventName]) => void)[]> = new Map();

  public on<T extends EventName>(type: T, listener: (doc: DocQ, e: EventTypeMap[T]) => void) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, []);
    }
    this.listeners.get(type).push(listener);
  }

  public off<T extends EventName>(type: T, listener: (doc: DocQ, e: EventTypeMap[T]) => void) {
    if (!this.listeners.has(type)) {
      return;
    }
    const index = this.listeners.get(type).indexOf(listener);
    if (index !== -1) {
      this.listeners.get(type).splice(index, 1);
    }
  }

  public emit<T extends EventName>(type: T, doc: DocQ, e?: EventTypeMap[T]) {
    if (!this.listeners.has(type)) {
      return;
    }
    this.listeners.get(type).forEach((listener) => {
      listener(doc, e);
    });
  }
}
