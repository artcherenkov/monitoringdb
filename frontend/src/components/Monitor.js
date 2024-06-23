import { getEvents, startBloodyHell, stopBloodyHell } from '../utils/api';
import '../assets/styles/monitor.css';

class Monitor {
  constructor(pollInterval = 5000) {
    this.element = document.createElement('div');
    this.element.id = 'monitor';
    this.pollInterval = pollInterval;
    this.polling = null;
    this.eventsCache = {};
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

  createEventElement(event) {
    const eventElement = document.createElement('div');
    eventElement.classList.add('monitor__event');
    eventElement.dataset.id = event.id;
    eventElement.innerHTML = `
      <span class="monitor__event-level">${this.getEmojiForLevel(event.eventLevel)}</span>
      <span class="monitor__event-comment">${event.comment}</span>
    `;
    setTimeout(() => eventElement.classList.add('show'), 50); // Задержка перед добавлением анимации
    return eventElement;
  }

  updateEvents(newEvents) {
    const eventsContainer = this.element.querySelector('.monitor__events-container');

    newEvents.forEach(event => {
      if (this.eventsCache[event.id]) {
        const cachedEvent = this.eventsCache[event.id];
        if (cachedEvent.eventLevel !== event.eventLevel || cachedEvent.comment !== event.comment) {
          const eventElement = eventsContainer.querySelector(`[data-id="${event.id}"]`);
          eventElement.querySelector('.monitor__event-level').textContent = this.getEmojiForLevel(event.eventLevel);
          eventElement.querySelector('.monitor__event-comment').textContent = event.comment;
          Object.assign(this.eventsCache[event.id], event);
        }
      } else {
        const eventElement = this.createEventElement(event);
        eventsContainer.prepend(eventElement);
        this.eventsCache[event.id] = event;
      }
    });
  }

  async handleStartBloodyHell() {
    await startBloodyHell();
  }

  async handleStopBloodyHell() {
    await stopBloodyHell();
  }

  render() {
    this.element.innerHTML = `
      <div class="monitor__controls">
        <button id="start-bloody-hell">Start Bloody Hell</button>
        <button id="stop-bloody-hell">Stop Bloody Hell</button>
      </div>
      <div class="monitor__events-container"></div>
    `;

    this.element.querySelector('#start-bloody-hell').addEventListener('click', this.handleStartBloodyHell.bind(this));
    this.element.querySelector('#stop-bloody-hell').addEventListener('click', this.handleStopBloodyHell.bind(this));
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
