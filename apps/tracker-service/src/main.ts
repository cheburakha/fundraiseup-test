import { join } from 'path';
import express, { Express, Request, Response } from 'express';
import compression from 'compression';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';

import * as config from "../../../config.json";
import { tracksApiV1 } from './tracks/service';

const path = config.TRACKER_PATH;
const { port, host } = new URL(path);
const trackerFilePath = join(process.env.PWD, 'dist/tracker-client-bundle.js');
const trackerApp: Express = express();

trackerApp.use(compression());
trackerApp.use(cors({ origin: true }));
trackerApp.use(json({ limit: '10mb' }));
trackerApp.use(urlencoded({ limit: '10mb', extended: true, parameterLimit: 1000000 }));

trackerApp.get('/', (req: Request, res: Response) => {
  res.sendFile(trackerFilePath);
});

trackerApp.use('/v1', tracksApiV1);

trackerApp.listen(parseInt(port), () => {
  console.log(`[tracker]: app is running at ${path}`);
});
