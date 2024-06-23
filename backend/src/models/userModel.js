const db = require('../config/dbConfig');

const User = {
  create: async (login, password, rights) => {
    const [result] = await db.execute('CALL add_user(?, ?, ?)', [login, password, rights]);
    return result;
  },
  findAll: async () => {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
  },
  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  },
  update: async (id, login, password, rights) => {
    const [result] = await db.execute('CALL update_user(?, ?, ?, ?)', [id, login, password, rights]);
    return result;
  },
  delete: async (id) => {
    const [result] = await db.execute('CALL delete_user(?)', [id]);
    return result;
  }
};

module.exports = User;
