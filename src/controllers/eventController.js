const Event = require('../models/eventModel');

const eventController = {
  getAllEvents: async (req, res) => {
    try {
      const events = await Event.findAll();
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  getEventById: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
      res.json(event);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  createEvent: async (req, res) => {
    try {
      const { event_level, comment } = req.body;
      const result = await Event.create(event_level, comment);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  updateEvent: async (req, res) => {
    try {
      const { event_level, comment } = req.body;
      const result = await Event.update(req.params.id, event_level, comment);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  deleteEvent: async (req, res) => {
    try {
      const result = await Event.delete(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

module.exports = eventController;
