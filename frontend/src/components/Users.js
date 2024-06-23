import { getUsers, createUser, updateUser, deleteUser, getUserById } from '../utils/api';
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
      <form id="users-form">
        <input type="hidden" id="user-id" />
        <label>
          New Login:
          <input type="text" id="user-login" required />
        </label>
        <label>
          New Password:
          <input type="password" id="user-password" required />
        </label>
        <label>
          New Role:
          <select id="user-rights" required>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </label>
        <button type="submit" id="users-submit">Save</button>
      </form>
    `;

    this.element.querySelectorAll('.users__edit').forEach(button => {
      button.addEventListener('click', this.handleEdit.bind(this));
    });

    this.element.querySelectorAll('.users__delete').forEach(button => {
      button.addEventListener('click', this.handleDelete.bind(this));
    });

    this.element.querySelector('#users-form').addEventListener('submit', this.handleSubmit.bind(this));
  }

  async handleEdit(event) {
    const userId = event.target.dataset.id;
    const user = await getUserById(userId);
    this.element.querySelector('#user-id').value = user.id;
    this.element.querySelector('#user-login').value = user.login;
    this.element.querySelector('#user-password').value = '';
    this.element.querySelector('#user-rights').value = user.rights;
  }

  async handleDelete(event) {
    const userId = event.target.dataset.id;
    await deleteUser(userId);
    this.fetchUsers();
  }

  async handleSubmit(event) {
    event.preventDefault();
    const id = this.element.querySelector('#user-id').value;
    const login = this.element.querySelector('#user-login').value;
    const password = this.element.querySelector('#user-password').value;
    const rights = this.element.querySelector('#user-rights').value;

    if (id) {
      await updateUser(id, { login, password, rights });
    } else {
      await createUser({ login, password, rights });
    }

    this.element.querySelector('#users-form').reset();
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
