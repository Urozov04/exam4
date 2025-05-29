import { config } from 'dotenv';
config();

export default {
  PORT: Number(process.env.PORT),
  PG_HOST: process.env.PG_HOST,
  PG_PORT: Number(process.env.PG_PORT),
  PG_USER: process.env.PG_USER,
  PG_PASS: String(process.env.PG_PASS),
  PG_DB: process.env.PG_DB,
  ADMIN_FULL_NAME: String(process.env.ADMIN_FULL_NAME),
  ADMIN_EMAIL: String(process.env.ADMIN_EMAIL),
  ADMIN_PHONE: String(process.env.ADMIN_PHONE),
  ADMIN_PASSWORD: String(process.env.ADMIN_PASSWORD),
  ACCESS_SECRET: String(process.env.ACCESS_TOKEN_SECRET),
  ACCESS_TIME: String(process.env.ACCESS_TOKEN_TIME),
  REFRESH_SECRET: String(process.env.REFRESH_TOKEN_SECRET),
  REFRESH_TIME: String(process.env.REFRESH_TOKEN_TIME),
};
