import { getCameras } from '../utils/api';
import '../assets/styles/camera.css';

class Camera {
  constructor(pollInterval = 5000) {
    this.element = document.createElement('div');
    this.element.id = 'camera';
    this.pollInterval = pollInterval;
    this.render();
    this.pollCameras();
  }

  async pollCameras() {
    try {
      const cameras = await getCameras();
      this.updateCameras(cameras);
      setTimeout(() => this.pollCameras(), this.pollInterval);
    } catch (error) {
      console.error('Error fetching cameras:', error);
      setTimeout(() => this.pollCameras(), this.pollInterval);
    }
  }

  updateCameras(cameras) {
    this.element.innerHTML = cameras.map(camera => `
      <div class="camera__item">
        <h3 class="camera__name">${camera.name}</h3>
        <img src="${camera.imageUrl}" alt="${camera.name}" class="camera__image" />
        <p class="camera__location">${camera.location}</p>
      </div>
    `).join('');
  }

  render() {
    this.element.innerHTML = '<div id="camera-loading">Loading...</div>';
  }

  getElement() {
    return this.element;
  }
}

export default Camera;
