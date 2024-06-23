import { getUsers, createUser, updateUser, deleteUser, getUserById } from '../utils/api';
import Popup from './Popup';
import '../assets/styles/users.css';

class Users {
  constructor() {
    this.element = document.createElement('div');
    this.element.id = 'users';
    this.render();
    this.fetchUsers();
  }

  async fetchUsers() {
    try {
      const users = await getUsers();
      this.updateUsers(users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  updateUsers(users) {
    this.element.innerHTML = `
      <h2>Users</h2>
      <button id="add-user-button" class="users__add">Add New User</button>
      <table class="users__table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Login</th>
            <th>Rights</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${users.map(user => `
            <tr>
              <td>${user.id}</td>
              <td>${user.login}</td>
              <td>${user.rights}</td>
              <td>
                <button class="users__edit" data-id="${user.id}">Edit</button>
                <button class="users__delete" data-id="${user.id}">Delete</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    this.element.querySelector('#add-user-button').addEventListener('click', this.openAddUserPopup.bind(this));
    this.element.querySelectorAll('.users__edit').forEach(button => {
      button.addEventListener('click', this.openEditUserPopup.bind(this));
    });

    this.element.querySelectorAll('.users__delete').forEach(button => {
      button.addEventListener('click', this.handleDeleteUser.bind(this));
    });
  }

  openAddUserPopup() {
    const content = `
      <label>
        <span>New Login:</span>
        <input type="text" id="user-login" required />
      </label>
      <label>
        <span>New Password:</span>
        <input type="password" id="user-password" required />
      </label>
      <label>
        <span>New Role:</span>
        <select id="user-rights" required>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </label>
    `;

    new Popup('Add User', content, this.handleAddUserSubmit.bind(this));
  }

  openEditUserPopup(event) {
    const userId = event.target.dataset.id;

    getUserById(userId).then(user => {
      const content = `
        <input type="hidden" id="user-id" value="${user.id}" />
        <label>
          <span>Login:</span>
          <input type="text" id="user-login" value="${user.login}" required />
        </label>
        <label>
          <span>Password:</span>
          <input type="password" id="user-password" required />
        </label>
        <label>
          <span>Role:</span>
          <select id="user-rights" required>
            <option value="admin" ${user.rights === 'admin' ? 'selected' : ''}>Admin</option>
            <option value="user" ${user.rights === 'user' ? 'selected' : ''}>User</option>
          </select>
        </label>
      `;

      new Popup('Edit User', content, this.handleEditUserSubmit.bind(this));
    });
  }

  async handleAddUserSubmit(event) {
    event.preventDefault();
    const login = document.querySelector('#user-login').value;
    const password = document.querySelector('#user-password').value;
    const rights = document.querySelector('#user-rights').value;
    await createUser({ login, password, rights });
    this.fetchUsers();
  }

  async handleEditUserSubmit(event) {
    event.preventDefault();
    const id = document.querySelector('#user-id').value;
    const login = document.querySelector('#user-login').value;
    const password = document.querySelector('#user-password').value;
    const rights = document.querySelector('#user-rights').value;
    await updateUser(id, { login, password, rights });
    this.fetchUsers();
  }

  async handleDeleteUser(event) {
    const userId = event.target.dataset.id;
    await deleteUser(userId);
    this.fetchUsers();
  }

  render() {
    this.element.innerHTML = '<div id="users-loading">Loading...</div>';
  }

  getElement() {
    return this.element;
  }
}

export default Users;
