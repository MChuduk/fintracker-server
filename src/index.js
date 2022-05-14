const config = require('./config');
const express = require('express');
const cron = require('node-cron');
const adminJsRouter = require('./adminjs/adminjs.router');
const authRouter = require('./auth/auth.router');
const currencyRouter = require('./currency/currency.router');
const walletsRouter = require('./wallets/wallets.router');
const snapshotsRouter = require('./snapshots/snapshots.router');
const transactionCategoriesRouter = require('./transaction-categories/transaction-categories.router');
const transactionsRouter = require('./transactions/transaction.router');
const dbService = require('./database/database.service');
const usersService = require('./users/users.service');
const currencyService = require('./currency/currency.service');
const adminJsService = require('./adminjs/adminjs.service');
const walletsService = require('./wallets/wallets.service');
const snapshotsService = require('./snapshots/snapshots.service');
const transactionCategoriesService = require('./transaction-categories/transaction-categories.service');
const transactionTypesService = require('./transaction-types/transaction-types.service');
const transactionsService = require('./transactions/transaction.service');
const authMiddleware = require('./auth/auth.middleware');

async function bootstrap() {
  await connectDatabase();

  const app = express();
  createServer(app);
  bindRoutes(app);
}

async function connectDatabase() {
  const dbContext = dbService.getContext();
  await dbContext.authenticate();

  await adminJsService.insertInitialData();

  await usersService.insertProcedures();
  await currencyService.insertProcedures();
  await snapshotsService.insertProcedures();
  await walletsService.insertProcedures();
  await transactionCategoriesService.insertProcedures();
  await transactionTypesService.insertProcedures();
  await transactionsService.insertProcedures();

  currencyService.updateExchangeRates();
  cron.schedule('0 * * * *', () => currencyService.updateExchangeRates());

  await transactionTypesService.insertInitData();
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
  app.use(prefix, authMiddleware, snapshotsRouter);
  app.use(prefix, authMiddleware, walletsRouter);
  app.use(prefix, authMiddleware, transactionCategoriesRouter);
  app.use(prefix, authMiddleware, transactionsRouter);
}

bootstrap();
