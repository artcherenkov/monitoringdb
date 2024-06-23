import eventBus from '../utils/eventBus';
import '../assets/styles/nav.css';

class Nav {
  constructor() {
    this.element = document.createElement('nav');
    this.element.id = 'nav';
    this.render();
  }

  render() {
    this.element.innerHTML = `
      <button id="nav-dashboard">Dashboard</button>
      <button id="nav-cameras">Cameras</button>
      <button id="nav-settings">Settings</button>
      <button id="nav-users">Users</button>
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
  }

  getElement() {
    return this.element;
  }
}

export default Nav;
