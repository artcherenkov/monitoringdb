import { getEvents, startBloodyHell, stopBloodyHell } from '../utils/api';
import '../assets/styles/monitor.css';

class Monitor {
  constructor(pollInterval = 5000) {
    this.element = document.createElement('div');
    this.element.id = 'monitor';
    this.pollInterval = pollInterval;
    this.polling = null;
    this.render();
    this.pollEvents();
  }

  async pollEvents() {
    try {
      const events = await getEvents();
      this.updateEvents(events);
      this.polling = setTimeout(() => this.pollEvents(), this.pollInterval);
    } catch (error) {
      console.error('Error fetching events:', error);
      this.polling = setTimeout(() => this.pollEvents(), this.pollInterval);
    }
  }

  getEmojiForLevel(level) {
    switch (level) {
      case 'low':
        return '✅ Low';
      case 'medium':
        return '⚠️ Medium';
      case 'high':
        return '🔥 High';
      case 'critical':
        return '💀 Critical';
      default:
        return level;
    }
  }

  updateEvents(events) {
    this.element.innerHTML = `
      <div class="monitor__controls">
        <button id="start-bloody-hell">Start Bloody Hell</button>
        <button id="stop-bloody-hell">Stop Bloody Hell</button>
      </div>
      ${events.map(event => `
        <div class="monitor__event">
          <span class="monitor__event-level">${this.getEmojiForLevel(event.eventLevel)}</span>
          <span class="monitor__event-comment">${event.comment}</span>
        </div>
      `).join('')}
    `;

    this.element.querySelector('#start-bloody-hell').addEventListener('click', this.handleStartBloodyHell.bind(this));
    this.element.querySelector('#stop-bloody-hell').addEventListener('click', this.handleStopBloodyHell.bind(this));
  }

  async handleStartBloodyHell() {
    await startBloodyHell();
  }

  async handleStopBloodyHell() {
    await stopBloodyHell();
  }

  render() {
    this.element.innerHTML = '<div id="monitor-loading">Loading...</div>';
  }

  getElement() {
    return this.element;
  }

  stopPolling() {
    if (this.polling) {
      clearTimeout(this.polling);
    }
  }
}

export default Monitor;
