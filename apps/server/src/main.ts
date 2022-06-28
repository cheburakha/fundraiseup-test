import { join } from 'path';
import express, { Express, Request, Response } from 'express';
import compression from 'compression';

import * as config from '../../../config.json';

const path = config.SERVER_PATH;
const { port, host } = new URL(path);
const templateFilePath = join(process.env.PWD, 'apps/server/public/index.html');
const serverApp: Express = express();

serverApp.use(compression());

serverApp.get(['/', '/*.html'], (req: Request, res: Response) => {
  res.sendFile(templateFilePath);
});

serverApp.listen(parseInt(port), () => {
  console.log(`[server]: app is running at ${path}`);
});
