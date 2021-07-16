export interface Comparable {
  hash(): string;
}

class ComparableSet<V extends Comparable> implements Set<V> {
  private map: Map<string, V> = new Map();

  get size() {
    return this.map.size;
  }
  add(value: V): this {
    this.map.set(value.hash(), value);
    return this;
  }
  delete(value: V): boolean {
    return this.map.delete(value.hash());
  }
  forEach(callbackfn: (value: V, value2: V, set: Set<V>) => void, thisArg?: any): void {
    this.map.forEach((v, _, __) => callbackfn(v, v, this), thisArg);
  }
  has(value: V): boolean {
    return this.map.has(value.hash());
  }
  entries(): IterableIterator<[V, V]> {
    const t = this;
    return (function* () {
      for (const [, v] of t.map) {
        yield [v, v] as [V, V];
      }
      return undefined;
    })();
  }
  clear() { return this.map.clear(); }
  keys() { return this.map.values(); }
  values() { return this.map.values(); }
  [Symbol.iterator] = this.values;
  [Symbol.toStringTag]: string;
}
export default ComparableSet;