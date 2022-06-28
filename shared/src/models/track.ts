import { Schema, model } from 'mongoose';

import { ITrack } from '@app/shared/track.interface';

const trackSchema = new Schema({
  event: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: String,
    },
  ],
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  ts: {
    type: String,
    required: true,
  },
});

const Track = model<ITrack>('Track', trackSchema);

export { trackSchema, Track };
