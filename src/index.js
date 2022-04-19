const config = require('./config');
const express = require('express');
const dbService = require('./database/database.service');
const adminJsService = require('./adminjs/adminjs.service');
const adminJsRouter = require('./adminjs/adminjs.router');
const authRouter = require('./auth/auth.router');

async function bootstrap() {
  const app = express();

  createServer(app);
  bindRoutes(app);
  await connectDatabase();
}

async function connectDatabase() {
  const dbContext = dbService.getContext();
  await dbContext.authenticate();
}

function createServer(app) {
  const port = config.PORT || 3000;
  app.listen(port, () => console.log(`server was started:${port}`));
}

function bindRoutes(app) {
  app.use(express.json());
  app.use(adminJsService.options.rootPath, adminJsRouter);
  app.use('/api', authRouter);
}

bootstrap();
