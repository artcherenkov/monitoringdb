import eventBus from '../utils/eventBus';
import { logout } from '../utils/api';
import '../assets/styles/nav.css';

class Nav {
  constructor() {
    this.element = document.createElement('nav');
    this.element.id = 'nav';
    this.render();
  }

  handleLogout() {
    logout().then(() => {
      localStorage.removeItem('token');
      eventBus.emit('navigate', '/auth');
    });
  }

  render() {
    this.element.innerHTML = `
      <button id="nav-dashboard">Dashboard</button>
      <button id="nav-cameras">Cameras</button>
      <button id="nav-settings">Settings</button>
      <button id="nav-users">Users</button>
      <button id="logout-button">Logout</button>
    `;

    this.element.querySelector('#nav-dashboard').addEventListener('click', () => {
      eventBus.emit('navigate', '/');
    });

    this.element.querySelector('#nav-cameras').addEventListener('click', () => {
      eventBus.emit('navigate', '/cameras');
    });

    this.element.querySelector('#nav-settings').addEventListener('click', () => {
      eventBus.emit('navigate', '/settings');
    });

    this.element.querySelector('#nav-users').addEventListener('click', () => {
      eventBus.emit('navigate', '/users');
    });

    this.element.querySelector('#logout-button').addEventListener('click', this.handleLogout.bind(this));
  }

  getElement() {
    return this.element;
  }
}

export default Nav;
