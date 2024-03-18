import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // se adminte de lo del DTO
      forbidNonWhitelisted: true, // error si envia otra informacion
      transform: true, //transformar los datos siempre que pueda
    }),
  );

  await app.listen(3000);
}
bootstrap();
