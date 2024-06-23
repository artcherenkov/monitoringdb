const db = require('../config/dbConfig');

const Event = {
  create: async (eventLevel, comment) => {
    const [result] = await db.query('INSERT INTO events (event_level, comment) VALUES (?, ?)', [eventLevel, comment]);
    return { id: result.insertId, eventLevel, comment };
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
    const [result] = await db.query('UPDATE events SET event_level = ?, comment = ? WHERE id = ?', [eventLevel, comment, id]);
    return { id, eventLevel, comment };
  },
  delete: async (id) => {
    await db.query('DELETE FROM events WHERE id = ?', [id]);
    return { id };
  },
};

module.exports = Event;
