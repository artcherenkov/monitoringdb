class EventBus {
  constructor() {
    this.listeners = {};
  }

  on(event, listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
  }

  off(event, listenerToRemove) {
    if (!this.listeners[event]) return;

    this.listeners[event] = this.listeners[event].filter(listener => listener !== listenerToRemove);
  }

  emit(event, data) {
    if (!this.listeners[event]) return;

    this.listeners[event].forEach(listener => listener(data));
  }
}

export default new EventBus();
