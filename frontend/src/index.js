import Router from './router';
import Auth from './components/Auth';
import Monitor from './components/Monitor';
import Camera from './components/Camera';
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
    this.router.addRoute('/monitor', () => this.renderComponent(new Monitor(this.pollInterval)));
    this.router.addRoute('/cameras', () => this.renderComponent(new Camera(this.pollInterval)));
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
    app.router.navigate('/cameras');
  } else {
    app.router.navigate('/');
  }
});
