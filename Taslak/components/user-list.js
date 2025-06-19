class UserList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.loadUsers();
  }

  async loadUsers() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await res.json();

    this.shadowRoot.innerHTML = `
      <h2>User List</h2>
      <ul>
        ${users.map(user => `<li data-id="${user.id}">${user.name}</li>`).join('')}
      </ul>
      <style>
        ul { list-style: none; padding: 0; }
        li { cursor: pointer; padding: 5px; }
        li:hover { background: #eee; }
      </style>
    `;

    this.shadowRoot.querySelectorAll('li').forEach(li => {
      li.addEventListener('click', () => {
        const event = new CustomEvent('user-selected', {
          detail: { userId: li.dataset.id },
          bubbles: true,
          composed: true
        });
        this.dispatchEvent(event);
      });
    });
  }
}

customElements.define('user-list', UserList);
