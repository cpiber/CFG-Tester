import { clamp, extendedClamp } from "./util";

describe('clamp', () => {
  test('works in bounds', () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(0, 0, 10)).toBe(0);
    expect(clamp(10, 0, 10)).toBe(10);

    expect(clamp(-3, -5, 10)).toBe(-3);
  });

  test('below', () => {
    expect(clamp(4.9999, 5, 10)).toBe(5);
    expect(clamp(-100, 5, 10)).toBe(5);
    expect(clamp(-10, -5, 0)).toBe(-5);
  });

  test('above', () => {
    expect(clamp(20, 0, 10)).toBe(10);
    expect(clamp(10.000001, 0, 10)).toBe(10);
    expect(clamp(-5, -20, -10)).toBe(-10);
  });
});

describe('extendedClamp', () => {
  test('2 args just parses to number', () => {
    expect(extendedClamp('4')).toBe(4);
    expect(extendedClamp('0')).toBe(0);
    expect(extendedClamp('12345')).toBe(12345);
    expect(extendedClamp('0x12')).toBe(0x12);
    expect(extendedClamp(4)).toBe(4);
  });

  test('2 args just parses to number with defaults', () => {
    expect(extendedClamp('')).toBe(0);
    expect(extendedClamp('as')).toBe(0);
    expect(extendedClamp('0x')).toBe(0);
    expect(extendedClamp('asd', 5)).toBe(5);
  });

  test('3 args adds min condition', () => {
    expect(extendedClamp('4', 0, 3)).toBe(4);
    expect(extendedClamp('4', 0, 5)).toBe(5);
    expect(extendedClamp('0x12', 0, 3)).toBe(0x12);
  });

  test('4 args with undefined adds max condition', () => {
    expect(extendedClamp('4', 0, undefined, 3)).toBe(3);
    expect(extendedClamp('4', 0, undefined, 5)).toBe(4);
    expect(extendedClamp('0x12', 0, undefined, 3)).toBe(3);
  });

  test('4 args clamps', () => {
    expect(extendedClamp('8', 0, 5, 10)).toBe(clamp(8, 5, 10));
    expect(extendedClamp('8', 0, 9, 10)).toBe(clamp(8, 9, 10));
    expect(extendedClamp('8', 0, 5, 6)).toBe(clamp(8, 5, 6));
  });
});