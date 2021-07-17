export interface Comparable {
  hash(): string;
}

class ComparableSet<V extends Comparable> implements Set<V> {
  private map: Map<string, V>;
  clear: () => void;
  keys: () => IterableIterator<V>;
  values: () => IterableIterator<V>;
  [Symbol.iterator]: () => IterableIterator<V>;

  constructor(other?: ComparableSet<V>) {
    this.map = other ? new Map(other.map) : new Map();
    this.clear = this.map.clear.bind(this.map);
    this.keys = this.map.values.bind(this.map);
    this.values = this.map.values.bind(this.map);
    this[Symbol.iterator] = this.values;
  }

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
    this.map.forEach((v, _, __) => callbackfn.call(thisArg, v, v, this), thisArg);
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
  get [Symbol.toStringTag]() { return "ComparableSet" };
}
export default ComparableSet;