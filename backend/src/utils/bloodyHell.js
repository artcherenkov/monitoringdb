const Event = require('../models/eventModel');

const events = [
  { comment: 'Плановый обход', level: 'low' },
  { comment: 'Пожар', level: 'critical' },
  { comment: 'Паника', level: 'medium' },
  { comment: 'Взлом двери', level: 'high' },
  { comment: 'Террористическая атака', level: 'critical' },
  { comment: 'Прилет дрона', level: 'high' },
  { comment: 'Потеря связи', level: 'medium' },
  { comment: 'Нарушение периметра', level: 'high' },
  { comment: 'Сбой электроэнергии', level: 'medium' },
  { comment: 'Незнакомец на объекте', level: 'medium' },
  { comment: 'Задержание подозрительного лица', level: 'high' },
  { comment: 'Взрыв', level: 'critical' },
  { comment: 'Авария на территории', level: 'high' },
  { comment: 'Медицинская помощь', level: 'medium' },
  { comment: 'Утечка газа', level: 'critical' },
  { comment: 'Срабатывание сигнализации', level: 'medium' },
  { comment: 'Дым в помещении', level: 'high' },
  { comment: 'Падение человека', level: 'medium' },
  { comment: 'Пропажа оборудования', level: 'high' },
  { comment: 'Отключение камер видеонаблюдения', level: 'medium' },
  { comment: 'Поломка техники', level: 'low' },
  { comment: 'Звонок в полицию', level: 'high' },
  { comment: 'Вызов пожарных', level: 'high' },
  { comment: 'Угроза взрыва', level: 'critical' },
  { comment: 'Потеря ключей', level: 'medium' },
  { comment: 'Пропажа сотрудника', level: 'high' },
  { comment: 'Нарушение режима работы', level: 'medium' },
  { comment: 'Переполненный мусорный бак', level: 'low' },
  { comment: 'Неисправность лифта', level: 'low' },
  { comment: 'Запах газа', level: 'high' },
  { comment: 'Замечен подозрительный предмет', level: 'high' },
  { comment: 'Отключение воды', level: 'low' },
  { comment: 'Включение аварийного освещения', level: 'medium' },
  { comment: 'Неожиданное отключение компьютеров', level: 'medium' },
  { comment: 'Замечена подозрительная сумка', level: 'high' },
  { comment: 'Незаконная парковка', level: 'low' },
  { comment: 'Повреждение ограждения', level: 'medium' },
  { comment: 'Нарушение санитарных норм', level: 'low' },
  { comment: 'Замечен бездомный', level: 'low' },
  { comment: 'Замечены дети на объекте', level: 'low' }
];

let intervalId;

const getRandomEvent = () => {
  const randomIndex = Math.floor(Math.random() * events.length);
  return events[randomIndex];
};

const startBloodyHell = () => {
  const randomDelay = Math.floor(Math.random() * 9) * 300 + 500;
  const { comment, level } = getRandomEvent();

  Event.create(level, comment)
    .then(() => {
      intervalId = setTimeout(startBloodyHell, randomDelay);
    })
    .catch(err => {
      console.error('Error creating event:', err);
    });
};

const stopBloodyHell = () => {
  clearTimeout(intervalId);
};

module.exports = {
  startBloodyHell,
  stopBloodyHell
};
