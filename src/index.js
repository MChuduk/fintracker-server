require('dotenv').config();
const express = require('express');

function bootstrap() {
  const app = express();

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`server was started:${port}`));
}

bootstrap();
