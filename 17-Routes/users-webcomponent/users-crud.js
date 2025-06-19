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
      // Update event listeners to use the shadowRoot
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
    const cancelAddUser = this.shadowRoot.querySelector("#cancelAddUser");
    const saveNewUser = this.shadowRoot.querySelector("#saveNewUser");
    const filterInput = this.shadowRoot.querySelector("#filterInput");
    const userForm = this.shadowRoot.querySelector("#userForm");
    const updateUserForm = this.shadowRoot.querySelector("#updateUserForm");
    const cancelUpdateUser = this.shadowRoot.querySelector("#cancelUpdateUser");

    if (!addUserBtn || !cancelAddUser || !saveNewUser || !filterInput || !userForm || !updateUserForm || !cancelUpdateUser) {
      console.error("Some elements were not found in the DOM");
      return;
    }

    addUserBtn.addEventListener("click", () => this.showAddUserModal());
    cancelAddUser.addEventListener("click", () => this.hideAddUserModal());
    cancelUpdateUser.addEventListener("click", () => this.hideUpdateUserModal());
    userForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.addUser();
    });
    updateUserForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.submitUpdateUser();
    });
    filterInput.addEventListener("input", (e) => this.filterUsers(e.target.value));
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
      <style>
        .users-container {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
        }
        .search-container {
          margin: 20px 0;
        }
        input {
          padding: 8px;
          width: 100%;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        input:invalid {
          border-color: #dc3545;
        }
        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        #addUserBtn {
          padding: 8px 16px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        #addUserBtn:hover {
          background-color: #0056b3;
        }
        #addUserBtn:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }

        /* Table Styles */
        .users-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }

        .users-table th,
        .users-table td {
          padding: 12px 15px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }

        .users-table th {
          background-color: #f8f9fa;
          font-weight: bold;
          color: #333;
        }

        .users-table tr:hover {
          background-color: rgba(0, 0, 0, 0.02);
        }

        .users-table .actions {
          display: flex;
          gap: 8px;
        }

        .users-table button {
          padding: 6px 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          color: white;
        }

        .users-table button.edit {
          background-color: #007bff;
        }

        .users-table button.delete {
          background-color: #dc3545;
        }

        /* Theme Colors for Table */
        .users-table.primary {
          background-color: #007bff;
          color: white;
        }
        .users-table.danger {
          background-color: #dc3545;
          color: white;
        }
        .users-table.success {
          background-color: #28a745;
          color: white;
        }
        .users-table.warning {
          background-color: #ffc107;
          color: black;
        }
        .users-table.light {
          background-color: #f8f9fa;
          color: black;
        }

        .users-table.primary th,
        .users-table.danger th,
        .users-table.success th {
          background-color: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .users-table.warning th,
        .users-table.light th {
          background-color: rgba(0, 0, 0, 0.1);
          color: black;
        }

        .users-table.primary td,
        .users-table.danger td,
        .users-table.success td {
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .users-table.warning td,
        .users-table.light td {
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        .modal {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
        }
        .modal-content {
          background-color: white;
          margin: 15% auto;
          padding: 20px;
          border-radius: 5px;
          width: 80%;
          max-width: 500px;
        }
        .modal input {
          margin-bottom: 10px;
        }
        .modal-buttons {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 20px;
        }
        .modal-buttons button {
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .modal-buttons button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
        .save-btn {
          background-color: #28a745;
          color: white;
        }
        .cancel-btn {
          background-color: #dc3545;
          color: white;
        }
        #loading {
          display: none;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1000;
        }
        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 5px solid #f3f3f3;
          border-top: 5px solid #3498db;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .error-message {
          color: #dc3545;
          font-size: 0.8em;
          margin-top: 4px;
        }
      </style>
      <div class="users-container">
        <div id="loading">
          <div class="loading-spinner"></div>
        </div>
        <div id="content">
          <div class="header-container">
            <h2>User Management</h2>
            <button id="addUserBtn">Add New User</button>
          </div>
          <div class="search-container">
            <input id="filterInput" placeholder="Search by name or email..." />
          </div>
          <div id="usersList"></div>
        </div>
      </div>
      <div id="addUserModal" class="modal">
        <div class="modal-content">
          <h3>Add New User</h3>
          <form id="userForm">
            <div>
              <input 
                id="newUserName" 
                placeholder="Enter name" 
                required 
                minlength="3"
                pattern="[A-Za-z ]{3,}"
              />
              <div class="error-message" id="nameError"></div>
            </div>
            <div>
              <input 
                id="newUserEmail" 
                type="email" 
                placeholder="Enter email" 
                required
              />
              <div class="error-message" id="emailError"></div>
            </div>
            <div class="modal-buttons">
              <button type="button" class="cancel-btn" id="cancelAddUser">Cancel</button>
              <button type="submit" class="save-btn" id="saveNewUser">Save</button>
            </div>
          </form>
        </div>
      </div>
      <div id="updateUserModal" class="modal">
        <div class="modal-content">
          <h3>Update User</h3>
          <form id="updateUserForm">
            <input type="hidden" id="updateUserId" />
            <div>
              <input 
                id="updateUserName" 
                placeholder="Enter name" 
                required 
                minlength="3"
                pattern="[A-Za-z ]{3,}"
              />
              <div class="error-message" id="updateNameError"></div>
            </div>
            <div>
              <input 
                id="updateUserEmail" 
                type="email" 
                placeholder="Enter email" 
                required
              />
              <div class="error-message" id="updateEmailError"></div>
            </div>
            <div class="modal-buttons">
              <button type="button" class="cancel-btn" id="cancelUpdateUser">Cancel</button>
              <button type="submit" class="save-btn" id="saveUpdateUser">Save</button>
            </div>
          </form>
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
      container.innerHTML = '<p>No users found.</p>';
      return;
    }

    // Get theme from attribute or default to light
    const theme = this.getAttribute('theme') || 'light';

    const table = document.createElement('table');
    table.className = `users-table ${theme}`;
    
    // Create table header
    const thead = document.createElement('thead');
    thead.innerHTML = `
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Actions</th>
      </tr>
    `;
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');
    users.forEach((user) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td class="actions">
          <button class="edit">Edit</button>
          <button class="delete">Delete</button>
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
      modal.style.display = "block";
    }
  }

  hideAddUserModal() {
    const modal = this.shadowRoot.querySelector("#addUserModal");
    if (modal) {
      modal.style.display = "none";
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
      modal.style.display = "block";
    }
  }

  hideUpdateUserModal() {
    const modal = this.shadowRoot.querySelector("#updateUserModal");
    if (modal) {
      modal.style.display = "none";
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
