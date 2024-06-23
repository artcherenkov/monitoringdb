import { getEvents } from '../utils/api';
import eventBus from '../utils/eventBus';
import '../assets/styles/monitor.css';

class Monitor {
  constructor(pollInterval = 5000) {
    this.element = document.createElement('div');
    this.element.id = 'monitor';
    this.pollInterval = pollInterval;
    this.render();
    this.pollEvents();
  }

  async pollEvents() {
    try {
      const events = await getEvents();
      this.updateEvents(events);
      setTimeout(() => this.pollEvents(), this.pollInterval);
    } catch (error) {
      console.error('Error fetching events:', error);
      setTimeout(() => this.pollEvents(), this.pollInterval);
    }
  }

  updateEvents(events) {
    this.element.innerHTML = events.map(event => `
      <div class="monitor__event">
        <span class="monitor__event-level">${event.event_level}</span>
        <span class="monitor__event-comment">${event.comment}</span>
      </div>
    `).join('');
  }

  render() {
    this.element.innerHTML = '<div id="monitor-loading">Loading...</div>';
  }

  getElement() {
    return this.element;
  }
}

export default Monitor;
