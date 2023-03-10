import { useContainer } from 'class-validator';
import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, VersioningType, VERSION_NEUTRAL, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json, urlencoded } from 'express';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: VERSION_NEUTRAL,
  });
  app.setGlobalPrefix(process.env.API_ENDPOINT_PREFIX || 'api');
  app.use(json({ limit: '120mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  const options = new DocumentBuilder()
    .setTitle('Megamind API')
    .setDescription('Document template')
    .setVersion('1.0')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'header-auth-key',
        description: 'enter token or by-passs',
      },
      'token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`${process.env.API_ENDPOINT_PREFIX || ''}/docs`, app, document);
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(process.env.PORT || 3000);
  console.log(`API listen at port: ${process.env.PORT || 3000}`);
}

bootstrap();
