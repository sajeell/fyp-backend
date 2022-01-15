import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Barganttic')
    .setDescription('Barganttic backend')
    .setVersion('1.0')
    .addTag('fyp')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer' },
      'bearer'
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);


  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Barganttic | FYP'
  };
  SwaggerModule.setup('api', app, document, customOptions);

  await app.listen(3000);
}
bootstrap();
