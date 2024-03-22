import { Block } from "../block";
import { DocQ } from "../doc";
import { Context } from "../doc/context";

export type EventName = keyof EventParameterMap;

export interface EventParameterMap {
  // Doc Event
  'click': { doc: DocQ };
  'mouseover': { block: Block, context: Context };

  'keydown': { context: Context, event: KeyboardEvent };
  'keyup': { context: Context, event: KeyboardEvent };

  'editablechange': { editable: boolean, context: Context };
  'selectionchange': { selection: Selection, context: Context };


  // Block Event
  'mouseenterblock': { block: Block, context: Context };
  'mouseleaveblock': { block: Block, context: Context };
}

export class EventEmitter {

  private listeners: Map<EventName, ((payload: EventParameterMap[EventName]) => void)[]> = new Map();

  public on<T extends EventName>(type: T, listener: (payload: EventParameterMap[T]) => void) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, []);
    }
    this.listeners.get(type).push(listener);
  }

  public off<T extends EventName>(type: T, listener: (payload: EventParameterMap[T]) => void) {
    if (!this.listeners.has(type)) {
      return;
    }
    const index = this.listeners.get(type).indexOf(listener);
    if (index !== -1) {
      this.listeners.get(type).splice(index, 1);
    }
  }

  public emit<T extends EventName>(type: T, payload: EventParameterMap[T]) {
    if (!this.listeners.has(type)) {
      return;
    }
    this.listeners.get(type).forEach((listener) => {
      listener(payload);
    });
  }
}
