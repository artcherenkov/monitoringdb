import { getCameras, createCamera, deleteCamera } from '../utils/api';
import Popup from './Popup';
import '../assets/styles/camera.css';

class Camera {
  constructor(pollInterval = 5000) {
    this.element = document.createElement('div');
    this.element.id = 'camera';
    this.pollInterval = pollInterval;
    this.polling = null;
    this.render();
    this.pollCameras();
  }

  async pollCameras() {
    try {
      const cameras = await getCameras();
      this.updateCameras(cameras);
      this.polling = setTimeout(() => this.pollCameras(), this.pollInterval);
    } catch (error) {
      console.error('Error fetching cameras:', error);
      this.polling = setTimeout(() => this.pollCameras(), this.pollInterval);
    }
  }

  updateCameras(cameras) {
    this.element.innerHTML = cameras.map(camera => `
      <div class="camera__item">
        <h3 class="camera__name">${camera.name}</h3>
        <img src="${camera.imageUrl}" alt="${camera.name}" class="camera__image" />
        <p class="camera__location">${camera.location}</p>
        <button class="camera__delete" data-id="${camera.id}">Delete</button>
      </div>
    `).join('');

    this.element.innerHTML += `
      <div class="camera__item camera__add">
        <button id="camera-add-button">+</button>
      </div>
    `;

    this.element.querySelector('#camera-add-button').addEventListener('click', this.openAddCameraPopup.bind(this));
    this.element.querySelectorAll('.camera__delete').forEach(button => {
      button.addEventListener('click', this.handleDeleteCamera.bind(this));
    });
  }

  openAddCameraPopup() {
    const content = `
      <label>
        Name:
        <input type="text" id="camera-name" required />
      </label>
      <label>
        Location:
        <input type="text" id="camera-location" required />
      </label>
    `;

    new Popup('Add Camera', content, this.handleAddCameraSubmit.bind(this));
  }

  async handleAddCameraSubmit(event) {
    event.preventDefault();
    const name = document.querySelector('#camera-name').value;
    const location = document.querySelector('#camera-location').value;
    await createCamera({ name, location });
  }

  async handleDeleteCamera(event) {
    const cameraId = event.target.dataset.id;
    await deleteCamera(cameraId);
  }

  render() {
    this.element.innerHTML = '<div id="camera-loading">Loading...</div>';
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

export default Camera;
