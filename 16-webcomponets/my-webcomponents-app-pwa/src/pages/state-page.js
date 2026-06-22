import { store } from '../store.js';
import { eventBus } from '../event-bus.js';
class PageHome extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    const state = store.getState();
    shadow.innerHTML = `
      <style>
        p { font-size: 1.1rem; }
        button { margin: 0.5rem; padding: 0.6rem 1rem; background: #0078ff; color: white; border: none; border-radius: 0.5rem; cursor: pointer; }
        button:hover { background: #005fcc; }
      </style>
      <h2>🏠 Home Page</h2>
      <p>Current count: <strong id="count-display">${state.count}</strong></p>
      <button id="inc">Increment</button>
      <button id="notify">Notify</button>
    `;
    shadow.querySelector('#inc').addEventListener('click', () => { store.increment(); });
    shadow.querySelector('#notify').addEventListener('click', () => { eventBus.emit('toast:show', '🔔 Global event fired from Home!'); });
    
    // Listen for state changes to update the counter display
    this.stateChangeHandler = (state) => {
      const countDisplay = shadow.querySelector('#count-display');
      if (countDisplay) {
        countDisplay.textContent = state.count;
      }
    };
    eventBus.on('state:changed', this.stateChangeHandler);
  }
  
  disconnectedCallback() {
    // Clean up event listener when component is removed
    if (this.stateChangeHandler) {
      eventBus.off('state:changed', this.stateChangeHandler);
    }
  }
}
customElements.define('page-home', PageHome);
