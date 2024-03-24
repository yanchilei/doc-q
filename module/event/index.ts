export class EventEmitter<T> {

  private listeners: Map<keyof T, ((payload: T[keyof T]) => void)[]> = new Map();

  public on<K extends keyof T>(type: K, listener: (payload: T[K]) => void) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, []);
    }
    this.listeners.get(type).push(listener);
  }

  public off<K extends keyof T>(type: K, listener: (payload: T[K]) => void) {
    if (!this.listeners.has(type)) {
      return;
    }
    const index = this.listeners.get(type).indexOf(listener);
    if (index !== -1) {
      this.listeners.get(type).splice(index, 1);
    }
  }

  public emit<K extends keyof T>(type: K, payload: T[K]) {
    if (!this.listeners.has(type)) {
      return;
    }
    this.listeners.get(type).forEach((listener) => {
      listener(payload);
    });
  }
}
