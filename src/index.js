const config = require('./config');
const express = require('express');
const adminJsRouter = require('./adminjs/adminjs.router');
const authRouter = require('./auth/auth.router');
const currencyRouter = require('./currency/currency.router');
const dbService = require('./database/database.service');
const currencyService = require('./currency/currency.service');
const adminJsService = require('./adminjs/adminjs.service');

async function bootstrap() {
  await connectDatabase();

  const app = express();
  createServer(app);
  bindRoutes(app);
}

async function connectDatabase() {
  const dbContext = dbService.getContext();
  await dbContext.authenticate();
  await currencyService.insertProcedures();
  await currencyService.insertInitData();
}

function createServer(app) {
  const port = config.PORT || 3000;
  app.listen(port, () => console.log(`server was started:${port}`));
}

function bindRoutes(app) {
  const prefix = '/api';
  app.use(express.json());
  app.use(adminJsService.options.rootPath, adminJsRouter);
  app.use(prefix, authRouter);
  app.use(prefix, currencyRouter);
}

bootstrap();
