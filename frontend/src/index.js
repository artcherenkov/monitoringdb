import Router from './router';
import Auth from './components/Auth';
import TestPage from './components/TestPage';
import eventBus from './utils/eventBus';

class App {
  constructor() {
    this.router = new Router();
    this.initRoutes();
    this.initEventListeners();
  }

  initRoutes() {
    this.router.addRoute('/', () => this.renderComponent(new Auth()));
    this.router.addRoute('/test', () => this.renderComponent(new TestPage()));
  }

  initEventListeners() {
    eventBus.on('login', (data) => {
      this.router.navigate('/test');
    });
  }

  renderComponent(component) {
    const appElement = document.getElementById('app');
    appElement.innerHTML = '';
    appElement.appendChild(component.getElement());
  }
}

const app = new App();

document.addEventListener('DOMContentLoaded', () => {
  app.router.navigate('/');
});
