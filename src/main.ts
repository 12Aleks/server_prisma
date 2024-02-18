import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = process.env.PORT_NUMBER
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () => console.log(`Server work on port ${PORT}`));
}
bootstrap();


//change db port
//mysql -h 127.0.0.1 -P 3307 -u user_name -p database_name


//error User `prisma_db_admin` was denied access on the database `prisma_db`
//mysql -u root -p
//SELECT User, Host FROM mysql.user WHERE User = 'prisma_db_admin';
//GRANT ALL PRIVILEGES ON *.* TO 'prisma_db_admin'@'localhost';
//FLUSH PRIVILEGES;
//npx prisma migrate dev --name init
//npm i @prisma/client