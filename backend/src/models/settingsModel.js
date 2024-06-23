const db = require('../config/dbConfig');

const Settings = {
  create: async (param, value) => {
    const [result] = await db.execute('CALL add_setting(?, ?)', [param, value]);
    return result;
  },
  findAll: async () => {
    const [rows] = await db.query('SELECT * FROM settings');
    return rows;
  },
  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM settings WHERE id = ?', [id]);
    return rows[0];
  },
  update: async (id, param, value) => {
    const [result] = await db.execute('CALL update_setting(?, ?, ?)', [id, param, value]);
    return result;
  },
  delete: async (id) => {
    const [result] = await db.execute('CALL delete_setting(?)', [id]);
    return result;
  }
};

module.exports = Settings;
