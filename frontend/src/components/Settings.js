import eventBus from '../utils/eventBus';
import '../assets/styles/settings.css';

class Settings {
  constructor() {
    this.element = document.createElement('div');
    this.element.id = 'settings';
    this.render();
  }

  handleSubmit(event) {
    event.preventDefault();
    const pollInterval = parseInt(this.element.querySelector('#settings-poll-interval').value, 10);
    localStorage.setItem('pollInterval', pollInterval); // Сохранение интервала в localStorage
    eventBus.emit('pollIntervalChanged', pollInterval);
  }

  render() {
    const savedPollInterval = localStorage.getItem('pollInterval') || 5000;
    this.element.innerHTML = `
      <form id="settings-form">
        <label>
          Poll Interval (ms):
          <input type="number" id="settings-poll-interval" value="${savedPollInterval}" required />
        </label>
        <button type="submit" id="settings-submit">Save</button>
      </form>
    `;

    this.element.querySelector('#settings-form').addEventListener('submit', this.handleSubmit.bind(this));
  }

  getElement() {
    return this.element;
  }
}

export default Settings;
