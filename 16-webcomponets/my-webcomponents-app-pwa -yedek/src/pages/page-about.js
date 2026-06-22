class PageAbout extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style> p { font-size: 1.1rem; } </style>
      <h2>ℹ️ About Page</h2>
      <p>This is a simple example of routing and event-driven toasts with Web Components.</p>
    `;
  }
}
customElements.define('page-about', PageAbout);
