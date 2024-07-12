import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // se adminte DTO
      forbidNonWhitelisted: true, // error si envia otra informacion
      transform: true, //transformar los datos siempre que pueda
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Stock Flow Pro')
    .setDescription('The stock API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(parseInt(process.env.PORT_SERVER, 10) || 3001);
}
bootstrap();
