## License

Nest is [MIT licensed](LICENSE).

## How To Start

docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=P@assw0rd -d -p 3307:3306 mysql 

Create connection in DBMS
  - user: root 
  - port: 3307
  - password: P@assw0rd

Create table "make_life_better_interview"

npm i -g @nestjs/cli

npm i 

npm run start:dev

After server has successfully start 
go to http://localhost:3000/api-docs for test api

For import visitor CSV use /api/seminars/:seminarId/visitors (POST)

For find visitor with filter use /api/seminars/:seminarId/visitors (GET)

visitors.csv is a test file for import visitors
