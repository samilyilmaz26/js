import { eventBus } from '../event-bus.js';
class NavBar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        nav { display: flex; gap: 1rem; background: #0078ff; color: white; padding: 0.8rem; justify-content: center; }
        a { color: white; text-decoration: none; cursor: pointer; }
        a:hover { text-decoration: underline; }
      </style>
      <nav>
        <a data-path="/">Home</a>
        <a data-path="/about">About</a>
      </nav>
    `;
    this.shadowRoot.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        eventBus.emit('navigate', a.dataset.path);
      });
    });
  }
}
customElements.define('nav-bar', NavBar);
