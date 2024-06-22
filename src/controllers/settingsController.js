const Settings = require('../models/settingsModel');

const settingsController = {
  getAllSettings: async (req, res) => {
    try {
      const settings = await Settings.findAll();
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  getSettingsById: async (req, res) => {
    try {
      const setting = await Settings.findById(req.params.id);
      if (!setting) {
        return res.status(404).json({ error: 'Setting not found' });
      }
      res.json(setting);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  createSettings: async (req, res) => {
    try {
      const { param, value } = req.body;
      const result = await Settings.create(param, value);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  updateSettings: async (req, res) => {
    try {
      const { param, value } = req.body;
      const result = await Settings.update(req.params.id, param, value);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  deleteSettings: async (req, res) => {
    try {
      const result = await Settings.delete(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

module.exports = settingsController;
