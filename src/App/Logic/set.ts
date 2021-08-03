export interface Comparable {
  hash(): string;
}

class ComparableSet<V extends Comparable> implements Set<V> {
  private _map: Map<string, V>;
  clear: () => void;
  keys: () => IterableIterator<V>;
  values: () => IterableIterator<V>;
  [Symbol.iterator]: () => IterableIterator<V>;

  constructor(other?: ComparableSet<V>) {
    this._map = other ? new Map(other._map) : new Map();
    this.clear = this._map.clear.bind(this._map);
    this.keys = this._map.values.bind(this._map);
    this.values = this._map.values.bind(this._map);
    this[Symbol.iterator] = this.values;
  }

  get size() {
    return this._map.size;
  }
  add(value: V): this {
    this._map.set(value.hash(), value);
    return this;
  }
  delete(value: V): boolean {
    return this._map.delete(value.hash());
  }
  forEach(callbackfn: (value: V, value2: V, set: Set<V>) => void, thisArg?: any): void {
    this._map.forEach((v, _, __) => callbackfn.call(thisArg, v, v, this), thisArg);
  }
  has(value: V): boolean {
    return this._map.has(value.hash());
  }
  entries(): IterableIterator<[V, V]> {
    const t = this;
    return (function* () {
      for (const [, v] of t._map) {
        yield [v, v] as [V, V];
      }
      return undefined;
    })();
  }
  get [Symbol.toStringTag]() { return "ComparableSet" }
}
export default ComparableSet;

export function setMap<T, U> (set: Set<T>, callbackfn: (value: T, index: number, set: Set<T>) => U, thisArg?: any) {
  const retArr = new Array<U>(set.size);
  let i = 0;
  for (const v of set) {
    retArr[i] = callbackfn.call(thisArg, v, i, set);
    i++;
  }
  return retArr;
}