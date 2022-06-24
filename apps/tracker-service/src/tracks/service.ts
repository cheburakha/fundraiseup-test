import express, { Express, Request, Response } from 'express';

const eventTag = 'tracks.new';
const tracksApiV1: Express = express();

tracksApiV1.on(eventTag, (data) => {
  console.log('on event, data:', data);
});

tracksApiV1.post('/tracks', ({ body: data }: Request, res: Response) => {
  const success = tracksApiV1.emit(eventTag, data);
  res.json({ success });
});

export { tracksApiV1 };
