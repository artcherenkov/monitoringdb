-- Создание таблицы users
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  login VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  rights VARCHAR(50) NOT NULL
);

-- Создание таблицы events
CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  event_level VARCHAR(50) NOT NULL,
  comment TEXT NOT NULL
);

-- Создание таблицы settings
CREATE TABLE settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  param VARCHAR(50) UNIQUE NOT NULL,
  value VARCHAR(255) NOT NULL
);

-- Создание таблицы cameras
CREATE TABLE cameras (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  location VARCHAR(255) NOT NULL,
  imageUrl VARCHAR(255) NOT NULL
);

-- Процедуры для работы с таблицей users
DELIMITER //

CREATE PROCEDURE add_user(IN p_login VARCHAR(50), IN p_password VARCHAR(255), IN p_rights VARCHAR(50))
BEGIN
  INSERT INTO users (login, password, rights) VALUES (p_login, SHA2(p_password, 256), p_rights);
END //

CREATE PROCEDURE update_user(IN p_id INT, IN p_login VARCHAR(50), IN p_password VARCHAR(255), IN p_rights VARCHAR(50))
BEGIN
  UPDATE users SET login = p_login, password = SHA2(p_password, 256), rights = p_rights WHERE id = p_id;
END //

CREATE PROCEDURE delete_user(IN p_id INT)
BEGIN
  DELETE FROM users WHERE id = p_id;
END //

-- Процедуры для работы с таблицей events
CREATE PROCEDURE add_event(IN p_event_level VARCHAR(50), IN p_comment TEXT)
BEGIN
  INSERT INTO events (event_level, comment) VALUES (p_event_level, p_comment);
END //

CREATE PROCEDURE update_event(IN p_id INT, IN p_event_level VARCHAR(50), IN p_comment TEXT)
BEGIN
  UPDATE events SET event_level = p_event_level, comment = p_comment WHERE id = p_id;
END //

CREATE PROCEDURE delete_event(IN p_id INT)
BEGIN
  DELETE FROM events WHERE id = p_id;
END //

-- Процедуры для работы с таблицей settings
CREATE PROCEDURE add_setting(IN p_param VARCHAR(50), IN p_value VARCHAR(255))
BEGIN
  INSERT INTO settings (param, value) VALUES (p_param, p_value);
END //

CREATE PROCEDURE update_setting(IN p_id INT, IN p_param VARCHAR(50), IN p_value VARCHAR(255))
BEGIN
  UPDATE settings SET param = p_param, value = p_value WHERE id = p_id;
END //

CREATE PROCEDURE delete_setting(IN p_id INT)
BEGIN
  DELETE FROM settings WHERE id = p_id;
END //

-- Процедуры для работы с таблицей cameras
CREATE PROCEDURE add_camera(IN p_name VARCHAR(50), IN p_location VARCHAR(255), IN p_imageUrl VARCHAR(255))
BEGIN
  INSERT INTO cameras (name, location, imageUrl) VALUES (p_name, p_location, p_imageUrl);
END //

CREATE PROCEDURE update_camera(IN p_id INT, IN p_name VARCHAR(50), IN p_location VARCHAR(255), IN p_imageUrl VARCHAR(255))
BEGIN
  UPDATE cameras SET name = p_name, location = p_location, imageUrl = p_imageUrl WHERE id = p_id;
END //

CREATE PROCEDURE delete_camera(IN p_id INT)
BEGIN
  DELETE FROM cameras WHERE id = p_id;
END //

-- Удаление триггеров, если они уже существуют
DROP TRIGGER IF EXISTS before_insert_user;
DROP TRIGGER IF EXISTS before_update_user;

-- Создание триггера для хэширования пароля перед вставкой
CREATE TRIGGER before_insert_user
BEFORE INSERT ON users
FOR EACH ROW
BEGIN
  SET NEW.password = SHA2(NEW.password, 256);
END //

-- Создание триггера для хэширования пароля перед обновлением
CREATE TRIGGER before_update_user
BEFORE UPDATE ON users
FOR EACH ROW
BEGIN
  IF NEW.password != OLD.password THEN
    SET NEW.password = SHA2(NEW.password, 256);
  END IF;
END //

DELIMITER ;
