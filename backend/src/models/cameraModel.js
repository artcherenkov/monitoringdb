const db = require('../config/dbConfig');

const Camera = {
  create: async (name, location, imageUrl) => {
    const [result] = await db.query('INSERT INTO cameras (name, location, imageUrl) VALUES (?, ?, ?)', [name, location, imageUrl]);
    return { id: result.insertId, name, location, imageUrl };
  },
  findAll: async () => {
    const [rows] = await db.query('SELECT id, name, location, imageUrl FROM cameras');
    return rows;
  },
  findById: async (id) => {
    const [rows] = await db.query('SELECT id, name, location, imageUrl FROM cameras WHERE id = ?', [id]);
    return rows[0];
  },
  update: async (id, name, location, imageUrl) => {
    const [result] = await db.query('UPDATE cameras SET name = ?, location = ?, imageUrl = ? WHERE id = ?', [name, location, imageUrl, id]);
    return { id, name, location, imageUrl };
  },
  delete: async (id) => {
    await db.query('DELETE FROM cameras WHERE id = ?', [id]);
    return { id };
  },
};

module.exports = Camera;
