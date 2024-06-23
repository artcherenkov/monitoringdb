const db = require('../config/dbConfig');

const Setting = {
  create: async (key, value) => {
    const [result] = await db.query('INSERT INTO settings (key, value) VALUES (?, ?)', [key, value]);
    return { id: result.insertId, key, value };
  },
  findAll: async () => {
    const [rows] = await db.query('SELECT id, key, value FROM settings');
    return rows;
  },
  findById: async (id) => {
    const [rows] = await db.query('SELECT id, key, value FROM settings WHERE id = ?', [id]);
    return rows[0];
  },
  update: async (id, key, value) => {
    const [result] = await db.query('UPDATE settings SET key = ?, value = ? WHERE id = ?', [key, value, id]);
    return { id, key, value };
  },
  delete: async (id) => {
    await db.query('DELETE FROM settings WHERE id = ?', [id]);
    return { id };
  },
};

module.exports = Setting;
