const db = require('../config/dbConfig');

const Setting = {
  create: async (param, value) => {
    const [result] = await db.query('CALL add_setting(?, ?)', [param, value]);
    return { id: result[0][0].id, param, value };
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
    const [result] = await db.query('CALL update_setting(?, ?, ?)', [id, param, value]);
    return { id, param, value };
  },
  delete: async (id) => {
    await db.query('CALL delete_setting(?)', [id]);
    return { id };
  },
};

module.exports = Setting;
