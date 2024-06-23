1. Поднять контейнер с БД
```sh
docker-compose up -d
```
2. Зайдите в админку adminer 
```sh
http://localhost:8080/
```
3. Введите данные для авторизации
```
System: MySQL
Server: db
Username: user
Password: password
Database: monitoring_db
```
4. Проверьте, что создались все таблицы и функции. Перейдите к таблице Users и убедитесь, что создались триггеры `before_insert_user` и `before_update_user`, хэширующие пароли.
5. Запустите бэкенд
```bash
cd backend
npm i
node src/server.js
```
6. Запустите фронтенд и перейдите по ссылке http://localhost:9000/, если она не открылась автоматически
```bash
cd frontend
npm i
npm start
```
7. Создайте пользователя через Adminer (http://localhost:8080/). Выберите слева таблицу 'users', под синим заголовком "Таблица: users" будет кнопка "Новая запись".
8. Теперь вы можете авторизоваться в веб-интерфейсе и продолжить работу в нем.
