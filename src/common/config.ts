import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot({
  envFilePath: '.env',
});

export const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
export const POSTGRES_CONTAINERPORT = Number(
  process.env.POSTGRES_CONTAINERPORT,
);
export const POSTGRES_USER = process.env.POSTGRES_USER;
export const POSTGRES_HOST =
  process.env.ENV === 'DOCKER' ? 'db' : process.env.POSTGRES_HOST;
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
export const POSTGRES_DB = process.env.POSTGRES_DB;
export const SALT_OR_ROUNDS = process.env.SALT_OR_ROUNDS
  ? process.env.SALT_OR_ROUNDS
  : 10;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
  ? process.env.JWT_SECRET_KEY
  : 'secret';
