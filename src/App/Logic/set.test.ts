import ComparableSet, { Comparable } from "./set";

class Test implements Comparable {
  constructor(public val: string) {
  }
  hash() { return this.val; }
}

let set: ComparableSet<Test>;
beforeEach(() => {
  set = new ComparableSet();
});

test('adding equal elements works as expected', () => {
  const val = 'test';
  const t1 = new Test(val);
  const t2 = new Test(val);

  expect(t1).not.toBe(t2);
  expect(t1).toEqual(t2);

  set.add(t1);
  expect(set.size).toBe(1);
  expect(set.has(t1)).toBe(true);
  expect(set.has(t2)).toBe(true);
  set.add(t2);
  expect(set.size).toBe(1);
});

test('adding distinct elements works as expected', () => {
  const t1 = new Test('t1');
  const t2 = new Test('t2');
  const t3 = new Test('t2');
  expect(t1).not.toEqual(t2);
  expect(t2).toEqual(t3);

  set.add(t1);
  set.add(t2);
  expect(set.size).toBe(2);

  set.add(t1); // double add
  expect(set.size).toBe(2);
  set.add(t3); // equal
  expect(set.size).toBe(2);
});

test('clearing works', () => {
  const t1 = new Test('t1');
  const t2 = new Test('t2');
  set.add(t1);
  set.add(t2);
  expect(set.size).toBe(2);
  set.clear();
  expect(set.size).toBe(0);
  set.add(t1);
  set.add(t2);
  expect(set.size).toBe(2);
});

test('removing elements works by equality', () => {
  const val = 'test';
  const t1 = new Test(val);
  const t2 = new Test(val);
  expect(t1).toEqual(t2);

  set.add(t1);
  expect(set.size).toBe(1);
  set.delete(t2);
  expect(set.size).toBe(0);
  set.add(t2);
  expect(set.size).toBe(1);
});

test('forEach correctly passes arguments and thisArg', () => {
  const t1 = new Test('t1');
  const t2 = new Test('t2');
  set.add(t1);
  set.add(t2);
  expect(set.size).toBe(2);

  const temp = jest.fn();
  set.forEach(function (this: any, value, key, s) {
    expect(this).toBe(t1);
    expect(s).toBe(set);
    temp(value, key);
  }, t1);
  expect(temp.mock.calls[0]).toEqual([t1, t1]);
  expect(temp.mock.calls[1]).toEqual([t2, t2]);
  expect(temp.mock.calls.length).toBe(2);
});

test('iteration works', () => {
  const t1 = new Test('t1');
  const t2 = new Test('t2');
  set.add(t1);
  set.add(t2);
  expect(set.size).toBe(2);

  const temp = jest.fn();
  for (const v of set) {
    temp(v);
  }
  expect(temp.mock.calls[0][0]).toEqual(t1);
  expect(temp.mock.calls[1][0]).toEqual(t2);
  expect(temp.mock.calls.length).toBe(2);
});

test('keys, values and entries return iterator for contents', () => {
  const t1 = new Test('t1');
  const t2 = new Test('t2');
  set.add(t1);
  set.add(t2);
  expect(set.size).toBe(2);

  expect([...set.values()]).toEqual([t1, t2]);
  expect([...set.keys()]).toEqual([t1, t2]);
  expect([...set.entries()]).toEqual([[t1, t1], [t2, t2]]);
});

test('copying set works', () => {
  const t1 = new Test('t1');
  const t2 = new Test('t2');
  set.add(t1);
  set.add(t2);
  expect(set.size).toBe(2);

  const set2 = new ComparableSet(set);
  expect(set2.size).toBe(2);
  expect(set2.has(t1)).toBe(true);
  expect(set2.has(t2)).toBe(true);
});

test('stringTag correctly set', () => {
  expect(set[Symbol.toStringTag]).toBe("ComparableSet");
});