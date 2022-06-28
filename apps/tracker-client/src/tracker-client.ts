import { ITrack } from '@app/shared/track.interface';
import { ITracker } from './tracker.interface';
import { TrackQueue } from './track-queue';

const queueSendThreshold = 3;
const retryMS = 1000;

class TrackerClient implements ITracker {
  private queue = new TrackQueue<ITrack>();
  private timeout = 0;

  constructor(private path: string) {
    window.addEventListener('beforeunload', () => {
      if (this.queue.length > 0) {
        const tracksToSend = this.queue.shift(this.queue.length);
        this.finalSend(tracksToSend);
      }
    });
  }

  private releaseTimer() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = 0;
    }
  }

  private async checkQueue() {
    if (this.queue.length >= queueSendThreshold) {
      const tracksToSend = this.queue.shift(this.queue.length);
      await this.send(tracksToSend);
    }
  }

  private async send(tracks: ITrack[]) {
    try {
      await fetch(`${this.path}/tracks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tracks }),
        keepalive: true, // keep opened tcp connection
      });
    } catch (e) {
      console.error('error sending the tracks, keeping them to retry ...');
      this.queue.push(...tracks);

      this.releaseTimer();

      this.timeout = window.setTimeout(async () => {
        await this.checkQueue();
        this.timeout = 0;
      }, retryMS);
    }
  }

  private finalSend(tracks: ITrack[]) {
    this.releaseTimer();
    const blob = new Blob([JSON.stringify({ tracks })], {
      type: 'application/json; charset=UTF-8',
    });
    navigator.sendBeacon(`${this.path}/tracks`, blob);
  }

  public async track(event: string, ...tags: string[]) {
    const track: ITrack = {
      event,
      tags,
      title: document.title,
      url: window.location.href,
      ts: new Date().toISOString(),
    };
    this.queue.push(track);

    await this.checkQueue();
  }
}

export { TrackerClient };
