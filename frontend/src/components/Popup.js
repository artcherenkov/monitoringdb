import '../assets/styles/popup.css';

class Popup {
  constructor(title, content, onSubmit) {
    this.title = title;
    this.content = content;
    this.onSubmit = onSubmit;
    this.element = document.createElement('div');
    this.element.classList.add('popup');
    this.render();
  }

  close() {
    this.element.remove();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.onSubmit(event);
    this.close();
  }

  render() {
    this.element.innerHTML = `
      <div class="popup__content">
        <div class="popup__header">
          <h2>${this.title}</h2>
          <button class="popup__close">&times;</button>
        </div>
        <form class="popup__form">
          ${this.content}
          <button type="submit" class="popup__submit">Submit</button>
        </form>
      </div>
    `;

    this.element.querySelector('.popup__close').addEventListener('click', () => this.close());
    this.element.querySelector('.popup__form').addEventListener('submit', this.handleSubmit.bind(this));

    document.body.appendChild(this.element);
  }
}

export default Popup;
