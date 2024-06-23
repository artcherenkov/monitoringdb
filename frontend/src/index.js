import Router from './router';
import Auth from './components/Auth';
import Monitor from './components/Monitor';
import TestPage from './components/TestPage';
import eventBus from './utils/eventBus';
import { checkAuth } from './utils/api';  // Импорт функции для проверки авторизации

class App {
  constructor() {
    this.router = new Router();
    this.pollInterval = 5000;
    this.initRoutes();
    this.initEventListeners();
  }

  initRoutes() {
    this.router.addRoute('/', () => this.renderComponent(new Auth()));
    this.router.addRoute('/test', () => this.renderComponent(new TestPage()));
    this.router.addRoute('/monitor', () => this.renderComponent(new Monitor(this.pollInterval)));
  }

  initEventListeners() {
    eventBus.on('login', (data) => {
      this.router.navigate('/monitor');
    });
  }

  renderComponent(component) {
    const appElement = document.getElementById('app');
    appElement.innerHTML = '';
    appElement.appendChild(component.getElement());
  }
}

const app = new App();

document.addEventListener('DOMContentLoaded', async () => {
  const isAuthenticated = await checkAuth();
  if (isAuthenticated) {
    app.router.navigate('/monitor');
  } else {
    app.router.navigate('/');
  }
});
