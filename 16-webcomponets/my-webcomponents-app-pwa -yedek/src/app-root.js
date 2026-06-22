import './components/nav-bar.js';
import './components/toast-container.js';
import './pages/page-home.js';
import './pages/page-about.js';
import { store } from './store.js';
import { eventBus } from './event-bus.js';

class AppRoot extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }
  connectedCallback() {
    window.addEventListener('popstate', () => this.render());
    eventBus.on('navigate', (path) => this.navigate(path));
  }
  navigate(path) {
    history.pushState({}, '', path);
    this.render();
  }
  render() {
    const route = location.pathname;
    let content;
    if (route === '/about') content = '<page-about></page-about>';
    else content = '<page-home></page-home>';
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; font-family: system-ui, sans-serif; }
        main { padding: 1rem; }
      </style>
      <nav-bar></nav-bar>
      <main>${content}</main>
      <toast-container></toast-container>
    `;
  }
}
customElements.define('app-root', AppRoot);
