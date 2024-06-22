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
