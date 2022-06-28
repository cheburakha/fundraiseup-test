import { ITrack } from '@app/shared/track.interface';
import { TrackQueue } from './track-queue';

interface Tracker {
  track(event: string, ...tags: string[]): void;
}

class TrackerClient implements Tracker {
  constructor(private path: string) {}

  private queue = new TrackQueue<ITrack>();

  async track(event: string, ...tags: string[]) {
    const track = {
      event,
      tags,
      title: document.title,
      url: window.location.href,
      ts: new Date().toISOString(),
    };
    this.queue.push(track);

    console.log(this.queue.length);
    if (this.queue.length > 2) {
      const tracksToSend = this.queue.shift(this.queue.length);

      await fetch(`${this.path}/tracks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tracks: tracksToSend }),
      });
    }
  }
}

export { TrackerClient };
