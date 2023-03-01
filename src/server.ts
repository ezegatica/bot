import express from 'express';
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import config from './config';
import Logger from './logger';

const app = express();
const port = config.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/output', (req, res) => {
  const fileName = 'out-0';

  if (!req.query.page) {
    return res.json({ message: 'Page is required' }).status(400);
  }
  const page = parseInt(req.query.page.toString(), 10);
  return readFile(fileName, res, page);
});

app.get('/errors', (req, res) => {
  const fileName = 'error-0';

  if (!req.query.page) {
    return res.json({ message: 'Page is required' }).status(400);
  }
  const page = parseInt(req.query.page.toString(), 10);
  return readFile(fileName, res, page);
});

app.get('*', (_req, res) => {
  res.redirect('https://ezegatica.com');
});

app.listen(port, () => {
  Logger.info(`Server started on port ${port}`);
  Logger.step(`http://localhost:${port}`);
});

function readFile(file: string, res: express.Response, page: number): void {
  const pageSize = 50;
  const filePath = path.join(__dirname, `../logs/${file}.log`);
  const streamPath = path.join(__dirname, `../logs/${file}.stream`);
  const instream = fs.createReadStream(filePath);
  const outstream = fs.createWriteStream(streamPath);
  const rl = readline.createInterface(instream, outstream);
  const arr: Log[] = [];

  rl.on('line', line => {
    arr.unshift(JSON.parse(line));
  });

  rl.on('close', () => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const result = arr.slice(startIndex, endIndex);

    const totalPages = Math.ceil(arr.length / pageSize);
    const currentPage = Math.min(page, totalPages);

    res.send({
      data: result.map(r => ({
        message: r.message,
        timestamp: r.timestamp
      })),
      page: currentPage,
      totalPages,
      totalLogs: arr.length
    });
  });
}

interface Log {
  message: string;
  timestamp: Date;
  type: 'out' | 'error';
  process_id: number;
  app_name: string;
}
