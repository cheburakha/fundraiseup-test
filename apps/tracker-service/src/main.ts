import 'reflect-metadata';

import { join } from 'path';
import compression from 'compression';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import express, { Express, Request, Response } from 'express';
import { connect, ConnectionStates } from 'mongoose';

import * as config from '../../../config.json';
import { tracksApiV1 } from './tracks/tracks-service';

const path = config.TRACKER_PATH;
const { port, host } = new URL(path);
const trackerFilePath = join(process.env.PWD, 'dist/tracker-client-bundle.js');
const trackerApp: Express = express();

trackerApp.use(compression());
trackerApp.use(cors({ origin: true }));
trackerApp.use(json({ limit: '10mb' }));
trackerApp.use(
  urlencoded({ limit: '10mb', extended: true, parameterLimit: 1000000 }),
);

trackerApp.get('/', (req: Request, res: Response) => {
  res.sendFile(trackerFilePath);
});

trackerApp.use('/', tracksApiV1);

const main = async () => {
  const dbconn = await connect(config.MONGODB_CONNECTION, {
    dbName: config.MONGODB_DATABASE,
    user: config.MONGODB_USER,
    pass: config.MONGODB_PASSWORD,
    keepAlive: true,
  });
  const connected =
    dbconn?.connection?.readyState === ConnectionStates.connected;
  console.log(`[tracker]: database connected: '${connected}'`);
  trackerApp.listen(parseInt(port), () => {
    console.log(`[tracker]: service is running at: '${path}'`);
  });
};

main();
