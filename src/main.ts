import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './common/config';

let app: INestApplication;

export async function bootstrap(PORT) {
  app = await NestFactory.create(AppModule);
  await app.listen(PORT, () => {
    console.log(`Server is listening on PORT = ${PORT}`);
  });
}

export async function appClose() {
  await app.close();
}

bootstrap(PORT);
