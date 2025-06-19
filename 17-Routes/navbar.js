export class CustomNavbar extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const wrapper = document.createElement('nav');
    wrapper.className = `navbar ${this.getAttribute('theme') || 'primary'}`;

    // Get menu items from attribute or use default
    let menuItems = [];
    try {
      menuItems = JSON.parse(this.getAttribute('menu-items') || '[]');
    } catch (e) {
      console.error('Invalid menu-items format');
    }

    const menuHTML = menuItems.map(item => 
      `<li><a href="${item.href}">${item.text}</a></li>`
    ).join('');

    wrapper.innerHTML = `
      <div class="navbar-content">
        <span class="logo">${this.getAttribute('logo') || 'MyApp'}</span>
        <ul class="menu">
          ${menuHTML}
        </ul>
      </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
      .navbar {
        padding: 1rem 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: sans-serif;
        color: white;
      }

      .navbar-content {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .logo {
        font-size: 1.5rem;
        font-weight: bold;
      }

      .menu {
        list-style: none;
        display: flex;
        gap: 1rem;
        margin: 0;
        padding: 0;
      }

      .menu a {
        text-decoration: none;
        color: inherit;
      }

      /* Theme Colors */
      .primary { background-color: #007bff; }
      .danger  { background-color: #dc3545; }
      .success { background-color: #28a745; }
      .warning { background-color: #ffc107; color: black; }
      .light   { background-color: #f8f9fa; color: black; }
    `;

    shadow.appendChild(style);
    shadow.appendChild(wrapper);
  }
}

customElements.define('custom-navbar', CustomNavbar); 