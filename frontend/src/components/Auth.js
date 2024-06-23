import { login } from '../utils/api';
import eventBus from '../utils/eventBus';

class Auth {
  constructor() {
    this.element = document.createElement('div');
    this.element.id = 'auth';
    this.render();
  }

  async handleSubmit(event) {
    event.preventDefault();
    const loginValue = this.element.querySelector('#auth-login').value;
    const passwordValue = this.element.querySelector('#auth-password').value;

    try {
      const response = await login({ login: loginValue, password: passwordValue });
      if (response.message === 'Logged in successfully') {
        eventBus.emit('login', response);
      } else {
        console.error(response.error);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }

  render() {
    this.element.innerHTML = `
      <form id="auth-form">
        <label>
          Login:
          <input type="text" id="auth-login" required />
        </label>
        <label>
          Password:
          <input type="password" id="auth-password" required />
        </label>
        <button type="submit" id="auth-submit">Login</button>
      </form>
    `;

    this.element.querySelector('#auth-form').addEventListener('submit', this.handleSubmit.bind(this));
  }

  getElement() {
    return this.element;
  }
}

export default Auth;
