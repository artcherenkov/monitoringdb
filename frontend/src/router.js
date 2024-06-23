class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    window.addEventListener('popstate', this.handleRouteChange.bind(this));
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  handleRouteChange() {
    const path = window.location.pathname;
    this.navigate(path);
  }

  navigate(path) {
    if (this.routes[path]) {
      this.routes[path]();
      this.currentRoute = path;
      window.history.pushState({}, path, window.location.origin + path);
    } else {
      console.error(`No route found for path: ${path}`);
    }
  }

  getCurrentPath() {
    return window.location.pathname;
  }
}

export default Router;
