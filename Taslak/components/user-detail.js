class UserDetail extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.user = {};
  }

  connectedCallback() {
    this.render();
    document.addEventListener('user-selected', e => this.loadUser(e.detail.userId));
  }

  async loadUser(id) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    this.user = await res.json();
    this.render();
  }

  async saveUser(e) {
    e.preventDefault();

    const form = this.shadowRoot.querySelector('form');
    const userData = {
      name: form.name.value,
      email: form.email.value
    };

    const method = this.user.id ? 'PUT' : 'POST';
    const url = this.user.id
      ? `https://jsonplaceholder.typicode.com/users/${this.user.id}`
      : `https://jsonplaceholder.typicode.com/users`;

    const res = await fetch(url, {
      method,
      body: JSON.stringify(userData),
      headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    });

    const saved = await res.json();
    alert(`User ${this.user.id ? 'updated' : 'created'} with ID: ${saved.id}`);
    this.user = {};
    this.render();
  }

  async deleteUser() {
    if (!this.user.id) return;
    await fetch(`https://jsonplaceholder.typicode.com/users/${this.user.id}`, {
      method: 'DELETE'
    });
    alert('User deleted');
    this.user = {};
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <h2>${this.user.id ? 'Edit User' : 'Add User'}</h2>
      <form>
        <input name="name" placeholder="Name" value="${this.user.name || ''}" required><br>
        <input name="email" placeholder="Email" value="${this.user.email || ''}" required><br>
        <button type="submit">${this.user.id ? 'Update' : 'Create'}</button>
        ${this.user.id ? '<button type="button" id="deleteBtn">Delete</button>' : ''}
      </form>
      <style>
        form { margin-top: 10px; }
        input, button { display: block; margin: 5px 0; }
      </style>
    `;

    this.shadowRoot.querySelector('form').addEventListener('submit', this.saveUser.bind(this));
    if (this.user.id) {
      this.shadowRoot.querySelector('#deleteBtn').addEventListener('click', this.deleteUser.bind(this));
    }
  }
}

customElements.define('user-detail', UserDetail);
