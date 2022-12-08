import http from 'http';
import logger from './logger';

logger.done('HTTP server alive running in port 8080!');
http
  .createServer((_req, res) => {
    res
      .writeHead(301, {
        Location: 'https://bot.ezegatica.com/'
      })
      .end();
  })
  .listen(8080);
