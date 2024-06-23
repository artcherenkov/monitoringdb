const db = require('../config/dbConfig');

const Camera = {
  create: async (name, location, imageUrl) => {
    const [result] = await db.query('CALL add_camera(?, ?, ?)', [name, location, imageUrl]);
    return { id: result[0][0].id, name, location, imageUrl };
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
    const [result] = await db.query('CALL update_camera(?, ?, ?, ?)', [id, name, location, imageUrl]);
    return { id, name, location, imageUrl };
  },
  delete: async (id) => {
    await db.query('CALL delete_camera(?)', [id]);
    return { id };
  },
};

module.exports = Camera;
