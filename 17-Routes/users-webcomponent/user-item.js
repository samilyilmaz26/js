class UserItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['user-id', 'name', 'email'];
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          margin: 8px 0;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        .user-field {
          margin: 4px 0;
        }
        .user-field span {
          font-weight: bold;
          margin-right: 8px;
        }
        .user-value {
          display: inline-block;
        }
        .actions {
          margin-top: 8px;
        }
        button {
          padding: 4px 8px;
          margin-right: 8px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .update-btn {
          background: #28a745;
          color: white;
        }
        .delete-btn {
          background: #dc3545;
          color: white;
        }
      </style>
      <div class="user-container">
        <div class="user-field">
          <span>ID:</span>
          <div class="user-value">${this.getAttribute('user-id')}</div>
        </div>
        <div class="user-field">
          <span>Name:</span>
          <div class="user-value">${this.getAttribute('name')}</div>
        </div>
        <div class="user-field">
          <span>Email:</span>
          <div class="user-value">${this.getAttribute('email')}</div>
        </div>
        <div class="actions">
          <button class="update-btn">Update</button>
          <button class="delete-btn">Delete</button>
        </div>
      </div>
    `;
  }

  addEventListeners() {
    const updateBtn = this.shadowRoot.querySelector('.update-btn');
    const deleteBtn = this.shadowRoot.querySelector('.delete-btn');

    updateBtn.addEventListener('click', () => this.handleUpdate());
    deleteBtn.addEventListener('click', () => this.handleDelete());
  }

  handleUpdate() {
    const userId = this.getAttribute('user-id');
    const name = this.getAttribute('name');
    const email = this.getAttribute('email');

    const updateEvent = new CustomEvent('user-update', {
      detail: {
        id: userId,
        name,
        email
      },
      bubbles: true,
      composed: true
    });

    this.dispatchEvent(updateEvent);
  }

  handleDelete() {
    const userId = this.getAttribute('user-id');
    const deleteEvent = new CustomEvent('user-delete', {
      detail: {
        id: userId
      },
      bubbles: true,
      composed: true
    });

    this.dispatchEvent(deleteEvent);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }
}

customElements.define('user-item', UserItem); 