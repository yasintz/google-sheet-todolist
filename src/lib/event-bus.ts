export default class EventBusClass {
  listeners: Record<string, Array<(...args: any[]) => void>> = {};
  addEventListener = (type: string, callback: () => void) => {
    if (typeof this.listeners[type] != 'undefined') {
      this.listeners[type].push(callback);
    } else {
      this.listeners[type] = [callback];
    }
  };
  removeEventListener = (type: string, callback: () => void) => {
    if (typeof this.listeners[type] != 'undefined') {
      this.listeners[type] = this.listeners[type].filter(
        (cb) => cb !== callback
      );
    }
  };
  dispatch = (type: string, ...args: any[]) => {
    if (typeof this.listeners[type] != 'undefined') {
      this.listeners[type].forEach((cb) => {
        cb(...args);
      });
    }
  };
}
