import { login } from '../utils/api';
import '../assets/styles/auth.css';
import eventBus from "../utils/eventBus";

class Auth {
  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('auth');
    this.render();
  }

  async handleSubmit(event) {
    event.preventDefault();
    const loginValue = this.element.querySelector('#login').value;
    const passwordValue = this.element.querySelector('#password').value;

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
      <div class="auth__container">
        <h2>Login</h2>
        <form id="auth__form" class="auth__form">
          <label for="login">Login</label>
          <input type="text" id="login" name="login" required>
          <label for="password">Password</label>
          <input type="password" id="password" name="password" required>
          <button type="submit" class="auth__submit">Login</button>
        </form>
      </div>
    `;

    this.element.querySelector('#auth__form').addEventListener('submit', this.handleSubmit.bind(this));
  }

  getElement() {
    return this.element;
  }
}

export default Auth;
