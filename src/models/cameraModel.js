const db = require('../config/dbConfig');

const Camera = {
  create: async (name, location, imageUrl) => {
    const [result] = await db.execute('CALL add_camera(?, ?, ?)', [name, location, imageUrl]);
    return result;
  },
  findAll: async () => {
    const [rows] = await db.query('SELECT * FROM cameras');
    return rows;
  },
  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM cameras WHERE id = ?', [id]);
    return rows[0];
  },
  update: async (id, name, location, imageUrl) => {
    const [result] = await db.execute('CALL update_camera(?, ?, ?, ?)', [id, name, location, imageUrl]);
    return result;
  },
  delete: async (id) => {
    const [result] = await db.execute('CALL delete_camera(?)', [id]);
    return result;
  }
};

module.exports = Camera;
