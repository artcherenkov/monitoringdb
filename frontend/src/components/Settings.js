import eventBus from '../utils/eventBus';
import { createSetting, getSettings, updateSetting } from '../utils/api';
import '../assets/styles/settings.css';

class Settings {
  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('settings');
    this.settings = [];
    this.render();
    this.fetchSettings();
  }

  async fetchSettings() {
    try {
      this.settings = await getSettings();
      this.renderSettings();
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  }

  handleSettingChange(id, event) {
    const newValue = event.target.value;
    const setting = this.settings.find(s => s.id === id);
    if (setting) {
      updateSetting(id, { param: setting.param, value: newValue }).then(() => {
        setting.value = newValue;
        if (setting.param === 'poll_interval') {
          localStorage.setItem('pollInterval', newValue);
          eventBus.emit('pollIntervalChanged', parseInt(newValue, 10));
        }
      });
    }
  }

  handleCreateSetting(event) {
    event.preventDefault();
    const param = this.element.querySelector('#new-setting-param').value;
    const value = this.element.querySelector('#new-setting-value').value;

    createSetting({ param, value }).then(() => {
      this.fetchSettings();
      document.querySelector('.popup').remove();
    });
  }

  renderSettings() {
    const settingsList = this.element.querySelector('.settings__list');
    settingsList.innerHTML = this.settings.map(setting => `
      <div class="settings__item">
        <span>${setting.param}</span>
        <input type="text" value="${setting.value}" data-id="${setting.id}" class="settings__input">
      </div>
    `).join('');

    this.element.querySelectorAll('.settings__input').forEach(input => {
      input.addEventListener('change', (event) => this.handleSettingChange(parseInt(input.dataset.id, 10), event));
    });
  }

  render() {
    this.element.innerHTML = `
      <div class="settings__container">
        <h2>Settings</h2>
        <div class="settings__list"></div>
        <button id="create-setting-button">Create New Setting</button>
      </div>
    `;

    this.element.querySelector('#create-setting-button').addEventListener('click', this.showCreateSettingPopup.bind(this));
  }

  showCreateSettingPopup() {
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.innerHTML = `
      <div class="popup__content">
        <button id="popup-close-button" class="popup__close-button">&times;</button>
        <h3>Create New Setting</h3>
        <form class="popup__form">
          <label for="new-setting-param">Param:</label>
          <input type="text" id="new-setting-param" required>
          <label for="new-setting-value">Value:</label>
          <input type="text" id="new-setting-value" required>
          <button type="submit">Create</button>
        </form>
      </div>
    `;
    document.body.appendChild(popup);

    popup.querySelector('.popup__form').addEventListener('submit', this.handleCreateSetting.bind(this));
    popup.querySelector('#popup-close-button').addEventListener('click', () => {
      popup.remove();
    });
  }

  getElement() {
    return this.element;
  }
}

export default Settings;
