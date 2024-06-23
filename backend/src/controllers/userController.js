const User = require('../models/userModel');

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  createUser: async (req, res) => {
    try {
      const { login, password, rights } = req.body;
      const result = await User.create(login, password, rights);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  updateUser: async (req, res) => {
    try {
      const { login, password, rights } = req.body;
      const result = await User.update(req.params.id, login, password, rights);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const result = await User.delete(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

module.exports = userController;
