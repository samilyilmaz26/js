import { ElbyQry, Api, Attr } from "../util.js";
import "./user-item.js";

class UsersCrud extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.users = [];
    this.Api = "https://jsonplaceholder.typicode.com/users";
    this.headers = { "Content-Type": "application/json; charset=UTF-8" };
    this.isLoading = false;
  }

  connectedCallback() {
    this.render();
    this.loadUsers();
    setTimeout(() => {
      this.shadowRoot.addEventListener("click", (e) => {
        const editButton = e.target.closest('.edit');
        const deleteButton = e.target.closest('.delete');
        
        if (editButton) {
          const tr = editButton.closest('tr');
          const index = Array.from(tr.parentNode.children).indexOf(tr);
          const user = this.users[index];
          this.showUpdateUserModal(user);
        }
        
        if (deleteButton) {
          const tr = deleteButton.closest('tr');
          const index = Array.from(tr.parentNode.children).indexOf(tr);
          const user = this.users[index];
          this.handleDelete(user.id);
        }
      });

      this.addEventListeners();
    }, 0);
  }

  addEventListeners() {
    this.shadowRoot.addEventListener("user-update", (e) => this.showUpdateUserModal(e.detail));
    this.shadowRoot.addEventListener("user-delete", (e) => this.handleDelete(e.detail.id));

    const addUserBtn = this.shadowRoot.querySelector("#addUserBtn");
    const cancelAddUserBtn = this.shadowRoot.querySelector("#cancelAddUser");
    const closeAddUserBtn = this.shadowRoot.querySelector("#addUserModal .btn-close");
    const saveNewUserBtn = this.shadowRoot.querySelector("#saveNewUser");
    const filterInput = this.shadowRoot.querySelector("#filterInput");
    const userForm = this.shadowRoot.querySelector("#userForm");
    const updateUserForm = this.shadowRoot.querySelector("#updateUserForm");
    const cancelUpdateUserBtn = this.shadowRoot.querySelector("#cancelUpdateUser");
    const closeUpdateUserBtn = this.shadowRoot.querySelector("#updateUserModal .btn-close");

    if (addUserBtn) {
      addUserBtn.addEventListener("click", () => this.showAddUserModal());
    }
    
    if (cancelAddUserBtn) {
      cancelAddUserBtn.addEventListener("click", () => this.hideAddUserModal());
    }

    if (closeAddUserBtn) {
      closeAddUserBtn.addEventListener("click", () => this.hideAddUserModal());
    }
    
    if (cancelUpdateUserBtn) {
      cancelUpdateUserBtn.addEventListener("click", () => this.hideUpdateUserModal());
    }

    if (closeUpdateUserBtn) {
      closeUpdateUserBtn.addEventListener("click", () => this.hideUpdateUserModal());
    }

    if (userForm) {
      userForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.addUser();
      });
    }

    if (updateUserForm) {
      updateUserForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.submitUpdateUser();
      });
    }

    if (filterInput) {
      filterInput.addEventListener("input", (e) => this.filterUsers(e.target.value));
    }
  }

  setLoading(loading) {
    this.isLoading = loading;
    const loadingEl = this.shadowRoot.querySelector("#loading");
    const contentEl = this.shadowRoot.querySelector("#content");
    if (loadingEl && contentEl) {
      loadingEl.style.display = loading ? "block" : "none";
      contentEl.style.opacity = loading ? "0.5" : "1";
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
      <style>
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.7);
          z-index: 1050;
          display: none;
          align-items: center;
          justify-content: center;
        }
        .modal.show {
          display: flex !important;
        }
        .modal-dialog {
          position: relative;
          width: 100%;
          max-width: 500px;
          margin: 1.75rem auto;
          z-index: 1055;
        }
        .modal-content {
          background-color: #ffffff;
          border-radius: 0.5rem;
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
        }
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.7);
          z-index: 1040;
        }
        .modal-header {
          background-color: #f8f9fa;
          border-bottom: 1px solid #dee2e6;
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
        }
        .modal-body {
          background-color: #ffffff;
        }
        .modal-footer {
          background-color: #f8f9fa;
          border-top: 1px solid #dee2e6;
          border-bottom-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
        }
        .form-control:focus {
          border-color: #80bdff;
          box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        }
        .invalid-feedback {
          color: #dc3545;
          font-size: 80%;
          margin-top: 0.25rem;
        }
      </style>
      <div class="container py-4">
        <div id="loading" class="position-absolute top-50 start-50 translate-middle" style="display: none;">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        
        <div id="content">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="mb-0">User Management</h2>
            <button id="addUserBtn" class="btn btn-primary">Add New User</button>
          </div>
          
          <div class="mb-4">
            <input id="filterInput" class="form-control" placeholder="Search by name or email..." />
          </div>
          
          <div id="usersList"></div>
        </div>

        <!-- Add User Modal -->
        <div id="addUserModal" class="modal" tabindex="-1">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Add New User</h5>
                <button type="button" class="btn-close" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form id="userForm">
                  <div class="mb-3">
                    <input id="newUserName" class="form-control" placeholder="Enter name" required minlength="3" pattern="[A-Za-z ]{3,}" />
                    <div class="invalid-feedback" id="nameError"></div>
                  </div>
                  <div class="mb-3">
                    <input id="newUserEmail" type="email" class="form-control" placeholder="Enter email" required />
                    <div class="invalid-feedback" id="emailError"></div>
                  </div>
                  <div class="modal-footer px-0 pb-0">
                    <button type="button" class="btn btn-secondary" id="cancelAddUser">Cancel</button>
                    <button type="submit" class="btn btn-primary" id="saveNewUser">Save</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <!-- Update User Modal -->
        <div id="updateUserModal" class="modal" tabindex="-1">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Update User</h5>
                <button type="button" class="btn-close" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form id="updateUserForm">
                  <input type="hidden" id="updateUserId" />
                  <div class="mb-3">
                    <input id="updateUserName" class="form-control" placeholder="Enter name" required minlength="3" pattern="[A-Za-z ]{3,}" />
                    <div class="invalid-feedback" id="updateNameError"></div>
                  </div>
                  <div class="mb-3">
                    <input id="updateUserEmail" type="email" class="form-control" placeholder="Enter email" required />
                    <div class="invalid-feedback" id="updateEmailError"></div>
                  </div>
                  <div class="modal-footer px-0 pb-0">
                    <button type="button" class="btn btn-secondary" id="cancelUpdateUser">Cancel</button>
                    <button type="submit" class="btn btn-primary" id="saveUpdateUser">Save</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  async loadUsers() {
    try {
      this.setLoading(true);
      const response = await Api.getAll(this.Api);
      if (Array.isArray(response)) {
        this.users = response;
        this.renderUsers(this.users);
      } else if (response.success && Array.isArray(response.data)) {
        this.users = response.data;
        this.renderUsers(this.users);
      } else {
        console.error('Invalid response format:', response);
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error loading users:', error);
      alert('Failed to load users. Please try again later.');
    } finally {
      this.setLoading(false);
    }
  }

  validateForm() {
    const nameInput = this.shadowRoot.querySelector("#newUserName");
    const emailInput = this.shadowRoot.querySelector("#newUserEmail");
    const nameError = this.shadowRoot.querySelector("#nameError");
    const emailError = this.shadowRoot.querySelector("#emailError");
    
    let isValid = true;

    // Reset error messages
    nameError.textContent = "";
    emailError.textContent = "";

    // Validate name
    if (!nameInput.value.trim()) {
      nameError.textContent = "Name is required";
      isValid = false;
    } else if (nameInput.value.length < 3) {
      nameError.textContent = "Name must be at least 3 characters";
      isValid = false;
    } else if (!/^[A-Za-z ]+$/.test(nameInput.value)) {
      nameError.textContent = "Name can only contain letters and spaces";
      isValid = false;
    }

    // Validate email
    if (!emailInput.value.trim()) {
      emailError.textContent = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
      emailError.textContent = "Please enter a valid email address";
      isValid = false;
    }

    return isValid;
  }

  renderUsers(users) {
    const container = this.shadowRoot.querySelector("#usersList");
    if (!container) return;
    container.innerHTML = "";
    
    if (users.length === 0) {
      container.innerHTML = '<div class="alert alert-info">No users found.</div>';
      return;
    }

    const table = document.createElement('table');
    table.className = 'table table-hover';
    
    const thead = document.createElement('thead');
    thead.innerHTML = `
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Actions</th>
      </tr>
    `;
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    users.forEach((user) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>
          <button class="btn btn-sm btn-primary edit me-2">Edit</button>
          <button class="btn btn-sm btn-danger delete">Delete</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    container.appendChild(table);
  }

  async handleDelete(id) {
    const confirmed = confirm('Are you sure you want to delete this user?');
    if (confirmed) {
      await this.deleteUser(id);
    }
  }

  async deleteUser(id) {
    try {
      this.setLoading(true);
      const response = await Api.delete(this.Api, id);
      console.log('API response:', response);
      
      if (response.success) {
        // Update the users array by filtering out the deleted user
        this.users = this.users.filter(user => user.id !== id);
        // Re-render the updated user list
        this.renderUsers(this.users);
        alert(`User deleted successfully`);
      } else {
        throw new Error(response.error || 'Failed to delete user');
      }
    } catch (error) {
      alert(`Error deleting user: ${error.message}`);
      console.error("Error deleting user:", error);
    } finally {
      this.setLoading(false);
    }
  }

  async updateUser({ id, name, email }) {
    try {
      this.setLoading(true);
      console.log('Updating user with data:', { id, name, email });
      const response = await Api.put(this.Api, { idx: id, name, email });
      console.log('API response:', response);
      
      if (response.success) {
        const updatedUser = response.data || { id, name, email };
        console.log('Updated user data:', updatedUser);
        
        // Update the users array with the response data
        this.users = this.users.map(user => {
          const shouldUpdate = user.id === parseInt(id);
          console.log('Comparing user IDs:', { userId: user.id, updateId: parseInt(id), shouldUpdate });
          return shouldUpdate ? { ...updatedUser, id: parseInt(id) } : user;
        });
        
        console.log('Updated users array:', this.users);
        // Force a re-render of all users
        this.renderUsers([...this.users]);
        this.hideUpdateUserModal();
        alert(`User updated successfully`);
      } else {
        throw new Error(response.error || 'Failed to update user');
      }
    } catch (error) {
      alert(`Error updating user: ${error.message}`);
      console.error("Error updating user:", error);
    } finally {
      this.setLoading(false);
    }
  }

  filterUsers(query) {
    const lower = query.toLowerCase();
    const filtered = this.users.filter(
      (user) =>
        user.name.toLowerCase().includes(lower) ||
        user.email.toLowerCase().includes(lower)
    );
    this.renderUsers(filtered);
  }

  showAddUserModal() {
    const modal = this.shadowRoot.querySelector("#addUserModal");
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      document.body.classList.add('modal-open');
      const backdrop = document.createElement('div');
      backdrop.className = 'modal-backdrop fade show';
      document.body.appendChild(backdrop);
    }
  }

  hideAddUserModal() {
    const modal = this.shadowRoot.querySelector("#addUserModal");
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
    }
  }

  async addUser() {
    const nameInput = this.shadowRoot.querySelector("#newUserName");
    const emailInput = this.shadowRoot.querySelector("#newUserEmail");

    if (!nameInput || !emailInput) {
      console.error("Could not find input elements");
      return;
    }

    const newUser = {
      name: nameInput.value,
      email: emailInput.value,
    };

    try {
      const response = await Api.post(this.Api, newUser);
      
      if (response.success) {
        const user = response.data;
        this.users.push(user);
        this.renderUsers(this.users);
        this.hideAddUserModal();

        // Clear input fields - fixing the setValue calls
        nameInput.value = "";
        emailInput.value = "";

        alert("User added successfully");
      } else {
        throw new Error(response.error || 'Failed to add user');
      }
    } catch (error) {
      alert(`Error adding user: ${error.message}`);
      console.error("Error adding user:", error);
    }
  }

  showUpdateUserModal(userData) {
    const modal = this.shadowRoot.querySelector("#updateUserModal");
    const nameInput = this.shadowRoot.querySelector("#updateUserName");
    const emailInput = this.shadowRoot.querySelector("#updateUserEmail");
    const idInput = this.shadowRoot.querySelector("#updateUserId");

    if (modal && nameInput && emailInput && idInput) {
      nameInput.value = userData.name;
      emailInput.value = userData.email;
      idInput.value = userData.id;
      modal.classList.add('show');
      modal.style.display = 'block';
      document.body.classList.add('modal-open');
      const backdrop = document.createElement('div');
      backdrop.className = 'modal-backdrop fade show';
      document.body.appendChild(backdrop);
    }
  }

  hideUpdateUserModal() {
    const modal = this.shadowRoot.querySelector("#updateUserModal");
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
    }
  }

  async submitUpdateUser() {
    const nameInput = this.shadowRoot.querySelector("#updateUserName");
    const emailInput = this.shadowRoot.querySelector("#updateUserEmail");
    const idInput = this.shadowRoot.querySelector("#updateUserId");

    if (!this.validateUpdateForm()) {
      return;
    }

    const updatedUser = {
      id: idInput.value,
      name: nameInput.value,
      email: emailInput.value,
    };

    await this.updateUser(updatedUser);
  }

  validateUpdateForm() {
    const nameInput = this.shadowRoot.querySelector("#updateUserName");
    const emailInput = this.shadowRoot.querySelector("#updateUserEmail");
    const nameError = this.shadowRoot.querySelector("#updateNameError");
    const emailError = this.shadowRoot.querySelector("#updateEmailError");
    
    let isValid = true;

    // Reset error messages
    nameError.textContent = "";
    emailError.textContent = "";

    // Validate name
    if (!nameInput.value.trim()) {
      nameError.textContent = "Name is required";
      isValid = false;
    } else if (nameInput.value.length < 3) {
      nameError.textContent = "Name must be at least 3 characters";
      isValid = false;
    } else if (!/^[A-Za-z ]+$/.test(nameInput.value)) {
      nameError.textContent = "Name can only contain letters and spaces";
      isValid = false;
    }

    // Validate email
    if (!emailInput.value.trim()) {
      emailError.textContent = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
      emailError.textContent = "Please enter a valid email address";
      isValid = false;
    }

    return isValid;
  }
}

customElements.define("users-crud", UsersCrud);
