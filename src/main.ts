import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { config } from 'dotenv';
config(); 


async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.use(cors());
  // app.enableCors({
  //   origin: 'http://localhost:8081', // Разрешаем доступ только с этого домена
  //   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Указываем разрешенные методы
  //   allowedHeaders: ['Content-Type', 'Authorization'], // Указываем разрешенные заголовки
  // });
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
