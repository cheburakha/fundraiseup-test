export class TrackQueue<T = any> {
  constructor(private elements: T[] = []) {}

  public get length() {
    return this.elements.length;
  }

  public set length(newLength) {
    this.elements.length = newLength;
  }

  public push(...args) {
    return this.elements.push(...args);
  }

  public shift(count = 1) {
    const shifted = [...this.elements.slice(0, count)];
    this.elements = [...this.elements.slice(count)];
    return shifted;
  }
}
