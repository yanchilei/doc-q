export enum EventName {
  CursorPositionChange = 'cursorPositionChange',
  CursorShowChange = 'cursorShowChange',

  DocModelChange = 'docModelChange',
  DocEditableChange = 'docEditableChange',
  DocClick = 'docClick',
  DocKeyDown = 'docKeyDown',
  DocKeyPress = 'docKeyPress',
  DocKeyUp = 'docKeyUp',
  DocCurrentChange = 'docCurrentChange',

}

class EventEmitter {
  private listeners: Map<string, ((data: any) => void)[]> = new Map();

  public on(type: string, listener: (data: any) => void) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, []);
    }
    this.listeners.get(type).push(listener);
  }

  public off(type: string, listener: (data: any) => void) {
    if (!this.listeners.has(type)) {
      return;
    }
    const index = this.listeners.get(type).indexOf(listener);
    if (index !== -1) {
      this.listeners.get(type).splice(index, 1);
    }
  }

  public emit(type: string, data?: any) {
    if (!this.listeners.has(type)) {
      return;
    }
    this.listeners.get(type).forEach((listener) => {
      listener(data);
    });
  }
}

export const eventEmitter = new EventEmitter();
