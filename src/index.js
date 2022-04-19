const config = require('./config');
const express = require('express');
const dbService = require('./database/database.service');

async function bootstrap() {
  const app = express();

  createServer(app);
  await connectDatabase();
}

async function connectDatabase() {
  const dbContext = dbService.getContext();
  await dbContext.authenticate();
  await dbContext.sync();
}

function createServer(app) {
  const port = config.PORT || 3000;
  app.listen(port, () => console.log(`server was started:${port}`));
}

bootstrap();
