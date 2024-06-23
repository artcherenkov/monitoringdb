1. Поднять контейнер с БД
```sh
cd backend
docker-compose up -d
```
2. Зайдите в админку adminer http://localhost:8080/
3. Введите данные для авторизации
```
System: MySQL
Server: db
Username: user
Password: password
Database: monitoring_db
```
4. Проверьте, что создались все таблицы и функции. Перейдите к таблице Users и убедитесь, что создались триггеры `before_insert_user` и `before_update_user`, хэширующие пароли.
5. Создайте в директории backend файл `.env` с содержимым: 
```dotenv
DB_HOST=localhost
DB_USER=user
DB_PASSWORD=password
DB_NAME=monitoring_db
PORT=3000
UNSPLASH_ACCESS_KEY=?
```
`UNSPLASH_ACCESS_KEY` я оставлю в начале отчета по лабораторной, вставьте его в соответствующее поле в `.env`
6. Запустите бэкенд
```bash
cd backend
npm i
node src/server.js
```
7. Запустите фронтенд и перейдите по ссылке http://localhost:9000/, если она не открылась автоматически
```bash
cd frontend
npm i
npm start
```
8. Авторизуйтесь под учетными данными
```
login: admin
password: admin
```
9. Теперь вы можете авторизоваться в веб-интерфейсе и продолжить работу в нем.
