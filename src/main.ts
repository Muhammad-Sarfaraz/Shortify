import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Middleware
  app.enableCors();
  app.use(helmet());

  // Global Validation
  app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: false }));

  // Set Global Prefix
  app.setGlobalPrefix('api');

  // OpenAPI Specification
  const config = new DocumentBuilder()
    .setTitle('Shortify')
    .setDescription(
      'Shortify: A Url-Shortner Service written in NestJs Framework',
    )
    .setVersion('1.0')
    .addTag('Shortify')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.APP_PORT || 5000);
}
bootstrap();
