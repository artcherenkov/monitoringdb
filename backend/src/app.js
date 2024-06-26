const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const cameraRoutes = require('./routes/cameraRoutes');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
const bloodyHellRoutes = require('./routes/bloodyHellRoutes');

const app = express();

const corsOptions = {
  origin: 'http://localhost:9000',  // Разрешаем запросы с этого домена
  credentials: true,  // Разрешаем передачу куки
};
app.use(cors(corsOptions))
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
app.use('/api/bloody-hell', bloodyHellRoutes);

// Обработчик ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

module.exports = app;
