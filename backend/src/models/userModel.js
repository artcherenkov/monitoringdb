const db = require('../config/dbConfig');

const User = {
  create: async (login, password, rights) => {
    const [result] = await db.query('INSERT INTO users (login, password, rights) VALUES (?, SHA2(?, 256), ?)', [login, password, rights]);
    return { id: result.insertId, login, rights };
  },
  findAll: async () => {
    const [rows] = await db.query('SELECT id, login, rights FROM users');
    return rows;
  },
  findById: async (id) => {
    const [rows] = await db.query('SELECT id, login, rights FROM users WHERE id = ?', [id]);
    return rows[0];
  },
  update: async (id, login, password, rights) => {
    const [result] = await db.query('UPDATE users SET login = ?, password = SHA2(?, 256), rights = ? WHERE id = ?', [login, password, rights, id]);
    return { id, login, rights };
  },
  delete: async (id) => {
    await db.query('DELETE FROM users WHERE id = ?', [id]);
    return { id };
  },
};

module.exports = User;
