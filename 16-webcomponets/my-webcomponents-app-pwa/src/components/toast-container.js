import { eventBus } from '../event-bus.js';
class ToastContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.toasts = [];
    this.render();
    eventBus.on('toast:show', (msg) => this.showToast(msg));
  }
  showToast(message) {
    const id = Date.now();
    this.toasts.push({ id, message });
    this.render();
    setTimeout(() => {
      this.toasts = this.toasts.filter(t => t.id !== id);
      this.render();
    }, 3000);
  }
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .container { position: fixed; bottom: 1rem; right: 1rem; display: flex; flex-direction: column; gap: 0.5rem; z-index: 999; }
        .toast { background: rgba(0,0,0,0.8); color: white; padding: 0.8rem 1.2rem; border-radius: 0.5rem; animation: fadeInOut 3s ease forwards; }
        @keyframes fadeInOut { 0%{opacity:0;transform:translateY(20px);} 10%,90%{opacity:1;transform:translateY(0);} 100%{opacity:0;transform:translateY(20px);} }
      </style>
      <div class="container">
        ${this.toasts.map(t => `<div class="toast">${t.message}</div>`).join('')}
      </div>
    `;
  }
}
customElements.define('toast-container', ToastContainer);
