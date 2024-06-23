import Router from './router';
import Auth from './components/Auth';
import Monitor from './components/Monitor';
import Camera from './components/Camera';
import Settings from './components/Settings';
import Nav from './components/Nav';
import eventBus from './utils/eventBus';
import { checkAuth } from './utils/api';  // Импорт функции для проверки авторизации

class App {
  constructor() {
    this.router = new Router();
    this.pollInterval = parseInt(localStorage.getItem('pollInterval')) || 5000;  // Используем сохраненный интервал
    this.currentComponent = null;
    this.initRoutes();
    this.initEventListeners();
  }

  initRoutes() {
    this.router.addRoute('/', () => this.renderComponent(new Monitor(this.pollInterval)));
    this.router.addRoute('/cameras', () => this.renderComponent(new Camera(this.pollInterval)));
    this.router.addRoute('/settings', () => this.renderComponent(new Settings()));
    this.router.addRoute('/auth', () => this.renderComponent(new Auth()));
  }

  initEventListeners() {
    eventBus.on('login', () => {
      this.router.navigate('/');
    });

    eventBus.on('pollIntervalChanged', (newInterval) => {
      this.pollInterval = newInterval;
      this.router.navigate(this.router.currentRoute); // Обновление текущего маршрута для применения нового интервала
    });

    eventBus.on('navigate', (path) => {
      this.router.navigate(path);
    });
  }

  renderComponent(component) {
    const appElement = document.getElementById('app');
    appElement.innerHTML = '';

    // Останавливаем поллинг для предыдущего компонента, если он есть
    if (this.currentComponent && typeof this.currentComponent.stopPolling === 'function') {
      this.currentComponent.stopPolling();
    }

    // Добавляем компонент навигации на все страницы, кроме страницы авторизации
    if (component instanceof Auth) {
      appElement.appendChild(component.getElement());
    } else {
      const nav = new Nav();
      appElement.appendChild(nav.getElement());
      appElement.appendChild(component.getElement());
    }

    this.currentComponent = component;
  }
}

const app = new App();

document.addEventListener('DOMContentLoaded', async () => {
  const isAuthenticated = await checkAuth();
  const initialPath = app.router.getCurrentPath();
  if (isAuthenticated) {
    app.router.navigate(initialPath);
  } else {
    app.router.navigate('/auth');
  }
});
