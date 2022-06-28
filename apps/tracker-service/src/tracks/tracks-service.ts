import express, { Express, Request, Response } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { Track } from '../../../../shared/src/models/track';
import { TracksCreateDto } from './tracks.dto';

const eventTag = 'tracks.new';
const tracksApiV1: Express = express();

tracksApiV1.on(eventTag, async (data) => {
  try {
    const tracksData: TracksCreateDto = data as any;
    const tracks = tracksData?.tracks?.map(
      ({ event, tags, title, url, ts }) =>
        new Track({ event, tags, title, url, ts }),
    );
    console.log(`on ${eventTag}, got tracks: ${tracks.length}`);
    await Track.insertMany(tracks, {});
  } catch (e) {
    console.error(e);
  }
});

tracksApiV1.post('/tracks', async ({ body }: Request, res: Response) => {
  const instance = plainToInstance(TracksCreateDto, body);
  const errors = await validate(instance, {
    whitelist: true,
  });

  if (errors?.length > 0) {
    res.statusMessage = 'Validation issues';
    return res.status(400).json({ errors, success: false });
  } else {
    return res.json({ success: tracksApiV1.emit(eventTag, body) });
  }
});

export { tracksApiV1 };
