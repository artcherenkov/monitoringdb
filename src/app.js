const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const cameraRoutes = require('./routes/cameraRoutes');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

// Маршруты для авторизации
app.use('/api/auth', authRoutes);

// Применение middleware аутентификации
app.use(authMiddleware);

// Защищенные маршруты
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/cameras', cameraRoutes);

// Обработчик ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

module.exports = app;
