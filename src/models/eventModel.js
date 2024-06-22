const db = require('../config/dbConfig');

const Event = {
  create: async (event_level, comment) => {
    const [result] = await db.execute('CALL add_event(?, ?)', [event_level, comment]);
    return result;
  },
  findAll: async () => {
    const [rows] = await db.query('SELECT * FROM events');
    return rows;
  },
  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM events WHERE id = ?', [id]);
    return rows[0];
  },
  update: async (id, event_level, comment) => {
    const [result] = await db.execute('CALL update_event(?, ?, ?)', [id, event_level, comment]);
    return result;
  },
  delete: async (id) => {
    const [result] = await db.execute('CALL delete_event(?)', [id]);
    return result;
  }
};

module.exports = Event;
