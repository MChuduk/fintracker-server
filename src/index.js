const config = require('./config');
const express = require('express');

function bootstrap() {
  const app = express();

  const port = config.PORT || 3000;
  app.listen(port, () => console.log(`server was started:${port}`));
}

bootstrap();
