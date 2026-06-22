import { eventBus } from './event-bus.js';
export const store = {
  state: { count: 0 },
  getState() { return this.state; },
  increment() {
    this.state.count++;
    eventBus.emit('state:changed', this.state);
    eventBus.emit('toast:show', `✅ Count increased to ${this.state.count}`);
  }
};
