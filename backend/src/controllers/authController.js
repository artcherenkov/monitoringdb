const jwt = require('jsonwebtoken');
const db = require('../config/dbConfig');
const jwtConfig = require('../config/jwtConfig');

const authController = {
  login: async (req, res) => {
    const { login, password } = req.body;

    try {
      const [rows] = await db.query('SELECT * FROM users WHERE login = ? AND password = SHA2(?, 256)', [login, password]);
      if (rows.length === 0) {
        return res.status(401).json({ error: 'Invalid login or password' });
      }

      const user = rows[0];
      const token = jwt.sign({ id: user.id, login: user.login }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });

      res.cookie('token', token, { httpOnly: true });
      res.json({ message: 'Logged in successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  checkAuth: (req, res) => {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    jwt.verify(token, jwtConfig.secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      res.status(200).json({ message: 'Authenticated' });
    });
  },

  logout: (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
  }
};

module.exports = authController;
