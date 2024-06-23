const db = require('../config/dbConfig');

const Event = {
  create: async (eventLevel, comment) => {
    const [result] = await db.query('CALL add_event(?, ?)', [eventLevel, comment]);
    return { id: result[0][0].id, eventLevel, comment };
  },
  findAll: async () => {
    const [rows] = await db.query('SELECT id, event_level AS eventLevel, comment FROM events');
    return rows;
  },
  findById: async (id) => {
    const [rows] = await db.query('SELECT id, event_level AS eventLevel, comment FROM events WHERE id = ?', [id]);
    return rows[0];
  },
  update: async (id, eventLevel, comment) => {
    const [result] = await db.query('CALL update_event(?, ?, ?)', [id, eventLevel, comment]);
    return { id, eventLevel, comment };
  },
  delete: async (id) => {
    await db.query('CALL delete_event(?)', [id]);
    return { id };
  },
};

module.exports = Event;
