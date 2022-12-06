import http from 'http';
import logger from './logger';

logger.done('Keep alive running in port 8080!');
http
  .createServer((_req, res) => {
    res.write('{"message": "hola!"}');
    res.end();
  })
  .listen(8080);
