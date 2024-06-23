class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    window.addEventListener('hashchange', this.handleRouteChange.bind(this));
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  handleRouteChange() {
    const path = window.location.hash.slice(1) || '/';
    this.navigate(path);
  }

  navigate(path) {
    if (this.routes[path]) {
      this.routes[path]();
      this.currentRoute = path;
    } else {
      console.error(`No route found for path: ${path}`);
    }
  }
}

export default Router;
