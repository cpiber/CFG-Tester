import { clamp } from "./util";

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