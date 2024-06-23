const db = require('../config/dbConfig');

const Setting = {
  create: async (param, value) => {
    const [result] = await db.query('INSERT INTO settings (param, value) VALUES (?, ?)', [param, value]);
    return { id: result.insertId, param, value };
  },
  findAll: async () => {
    const [rows] = await db.query('SELECT id, param, value FROM settings');
    return rows;
  },
  findById: async (id) => {
    const [rows] = await db.query('SELECT id, param, value FROM settings WHERE id = ?', [id]);
    return rows[0];
  },
  update: async (id, param, value) => {
    const [result] = await db.query('UPDATE settings SET param = ?, value = ? WHERE id = ?', [param, value, id]);
    return { id, param, value };
  },
  delete: async (id) => {
    await db.query('DELETE FROM settings WHERE id = ?', [id]);
    return { id };
  },
};

module.exports = Setting;
