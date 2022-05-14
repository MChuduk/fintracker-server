require('dotenv').config();

module.exports = {
  PORT: process.env.PORT,
  DB_TYPE: process.env.DB_TYPE,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_NAME: process.env.DB_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
  ADMIN_JS_SESSION_SECRET: process.env.ADMIN_JS_SESSION_SECRET,
  ADMIN_JS_EMAIL: process.env.ADMIN_JS_EMAIL,
  ADMIN_JS_PASSWORD: process.env.ADMIN_JS_PASSWORD,
};
