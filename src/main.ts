import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ValidationPipe } from '@nestjs/common'

import { AppModule } from 'src/app.module'
require('newrelic')

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  )
  app.enableCors()

  const config = new DocumentBuilder()
    .setTitle('Barganttic')
    .setDescription('Barganttic backend')
    .setVersion('1.0')
    .addTag('fyp')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)

  const date = new Date()
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  SwaggerModule.setup(`docs/${year}/${month}/${day}`, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  })

  const PORT = process.env.PORT || 3000

  await app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
  })
}
bootstrap()
