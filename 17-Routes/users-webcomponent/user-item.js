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
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
      <div class="card mb-3">
        <div class="card-body">
          <div class="mb-2">
            <strong class="me-2">ID:</strong>
            <span class="text-secondary">${this.getAttribute('user-id')}</span>
          </div>
          <div class="mb-2">
            <strong class="me-2">Name:</strong>
            <span class="text-secondary">${this.getAttribute('name')}</span>
          </div>
          <div class="mb-2">
            <strong class="me-2">Email:</strong>
            <span class="text-secondary">${this.getAttribute('email')}</span>
          </div>
          <div class="mt-3">
            <button class="btn btn-primary me-2 update-btn">Update</button>
            <button class="btn btn-danger delete-btn">Delete</button>
          </div>
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