## License

Nest is [MIT licensed](LICENSE).

## How To Start

docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=P@assw0rd -d -p 3307:3306 mysql 

create connection in DBMS
  - user: root 
  - port: 3307
  - password: P@assw0rd

create table "make_life_better_interview"

npm i -g @nestjs/cli

npm i 

npm run start:dev

after server has successfully start 
go to http://localhost:3000/api-docs for test api

to import visitor CSV use /api/seminars/:seminarId/visitors (POST)
to find visitor with filter use /api/seminars/:seminarId/visitors (GET)