class TestPage {
  constructor() {
    this.element = document.createElement('div');
    this.element.id = 'test-page';
    this.render();
  }

  render() {
    this.element.innerHTML = `
      <h1>Test Page</h1>
      <p>Welcome to the test page!</p>
    `;
  }

  getElement() {
    return this.element;
  }
}

export default TestPage;
