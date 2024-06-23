const Camera = require('../models/cameraModel');

const cameraController = {
  getAllCameras: async (req, res) => {
    try {
      const cameras = await Camera.findAll();
      res.json(cameras);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  getCameraById: async (req, res) => {
    try {
      const camera = await Camera.findById(req.params.id);
      if (!camera) {
        return res.status(404).json({ error: 'Camera not found' });
      }
      res.json(camera);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  createCamera: async (req, res) => {
    try {
      const { name, location, imageUrl } = req.body;
      const result = await Camera.create(name, location, imageUrl);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  updateCamera: async (req, res) => {
    try {
      const { name, location, imageUrl } = req.body;
      const result = await Camera.update(req.params.id, name, location, imageUrl);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  deleteCamera: async (req, res) => {
    try {
      const result = await Camera.delete(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

module.exports = cameraController;
