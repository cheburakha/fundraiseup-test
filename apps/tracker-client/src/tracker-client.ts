interface Tracker {
  track(event: string, ...tags: string[]): void;
}

class TrackerClient implements Tracker {
  constructor(private path: string) {}

  async track(event: string, ...tags: string[]) {
    await fetch(`${this.path}/v1/tracks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, tags }),
    });
  }
}

export { TrackerClient };
