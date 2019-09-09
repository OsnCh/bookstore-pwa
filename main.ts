import "reflect-metadata";
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExceptionHandlerFilter } from './common';

async function bootstrap() {
  const fs = require('fs');
  let key = fs.readFileSync('./applisaas.pem', 'utf8');
  let cert = fs.readFileSync('./applisaas.crt', 'utf8')
  const app = await NestFactory.create(ApplicationModule, {cors: true, httpsOptions: {
    cert: cert,
    key: key
  }});
  const port = process.env.PORT || 3001;

  const options = new DocumentBuilder()
    .setTitle('Books store')
    .setDescription('WebAPI for selling books and magazines')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  app.useGlobalFilters(new ExceptionHandlerFilter())
  await app.listen(port);
}
bootstrap();
