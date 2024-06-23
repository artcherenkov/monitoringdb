const db = require('../config/dbConfig');

const User = {
  create: async (login, password, rights) => {
    const [result] = await db.query('CALL add_user(?, ?, ?)', [login, password, rights]);
    return { id: result[0][0].id, login, rights };
  },
  findAll: async () => {
    const [rows] = await db.query('SELECT id, login, rights FROM users');
    return rows;
  },
  findById: async (id) => {
    const [rows] = await db.query('SELECT id, login, rights FROM users WHERE id = ?', [id]);
    return rows[0];
  },
  findByLogin: async (login) => {
    const [rows] = await db.query('SELECT * FROM users WHERE login = ?', [login]);
    return rows[0];
  },
  update: async (id, login, password, rights) => {
    await db.query('CALL update_user(?, ?, ?, ?)', [id, login, password, rights]);
    return { id, login, rights };
  },
  delete: async (id) => {
    await db.query('CALL delete_user(?)', [id]);
    return { id };
  },
};

module.exports = User;
