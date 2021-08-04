import { clamp } from './Logic/util';
import { EXP_DEPTH, EXP_ITER, EXP_NONTERM, NUM_KEY, readGenNum, readMaxDepth, readMaxIter, readMaxNonTerms, readSyntax, SYN_KEY, writeGenNum, writeMaxDepth, writeMaxIter, writeMaxNonTerms, writeSyntax } from "./values";

afterEach(() => {
  window.localStorage.clear();
});

describe('maxDepth', () => {
  test('reading with nothing in localstorage works with default', () => {
    expect(readMaxDepth()).toBe(20);
  });

  test('reading reads from localstorage', () => {
    const val = 4;
    window.localStorage.setItem(EXP_DEPTH, '' + val);
    expect(readMaxDepth()).toBe(val);
  });

  test('writing puts number', () => {
    const val = 100;
    writeMaxDepth(val);
    expect(+(window.localStorage.getItem(EXP_DEPTH) || '')).toBe(val);
    expect(readMaxDepth()).toBe(val);
  });
});

describe('maxNonTerms', () => {
  test('reading with nothing in localstorage works with default', () => {
    expect(readMaxNonTerms()).toBe(10);
  });

  test('reading reads from localstorage', () => {
    const val = 200;
    window.localStorage.setItem(EXP_NONTERM, '' + val);
    expect(readMaxNonTerms()).toBe(val);
  });

  test('writing puts number', () => {
    const val = 255;
    writeMaxNonTerms(val);
    expect(+(window.localStorage.getItem(EXP_NONTERM) || '')).toBe(val);
    expect(readMaxNonTerms()).toBe(val);
  });
});

describe('maxIter', () => {
  test('reading with nothing in localstorage works with default', () => {
    expect(readMaxIter()).toBe(5000);
  });

  test('reading reads from localstorage', () => {
    const val = 10000;
    window.localStorage.setItem(EXP_ITER, '' + val);
    expect(readMaxIter()).toBe(val);
  });

  test('writing puts number', () => {
    const val = 1010;
    writeMaxIter(val);
    expect(+(window.localStorage.getItem(EXP_ITER) || '')).toBe(val);
    expect(readMaxIter()).toBe(val);
  });
});

describe('genNum', () => {
  test('reading with nothing in localstorage works with default', () => {
    expect(readGenNum()).toBe(15);
  });

  test('reading reads from localstorage', () => {
    const val = 500;
    window.localStorage.setItem(NUM_KEY, '' + val);
    expect(readGenNum()).toBe(val);
  });

  test('writing puts number', () => {
    const val = 200;
    writeGenNum(val);
    expect(+(window.localStorage.getItem(NUM_KEY) || '')).toBe(val);
    expect(readGenNum()).toBe(val);
  });

  test('reading respects constraints', () => {
    const val1 = 5000;
    window.localStorage.setItem(NUM_KEY, '' + val1);
    expect(readGenNum()).toBe(clamp(val1, 1, 999));
    const val2 = 0;
    window.localStorage.setItem(NUM_KEY, '' + val2);
    expect(readGenNum()).toBe(clamp(val2, 1, 999));
  });

  test('writing respects constraints', () => {
    const val1 = 2000;
    writeGenNum(val1);
    expect(+(window.localStorage.getItem(NUM_KEY) || '')).toBe(clamp(val1, 1, 999));
    expect(readGenNum()).toBe(clamp(val1, 1, 999));
    const val2 = -5;
    writeGenNum(val2);
    expect(+(window.localStorage.getItem(NUM_KEY) || '')).toBe(clamp(val2, 1, 999));
    expect(readGenNum()).toBe(clamp(val2, 1, 999));
  });
});

describe('syntax', () => {
  test('reading with nothing in localstorage works with default', () => {
    expect(readSyntax()).toBe('fcs');
  });

  test('reading reads from localstorage', () => {
    const val = 'bnf';
    window.localStorage.setItem(SYN_KEY, val);
    expect(readSyntax()).toBe(val);
  });

  test('writing puts value', () => {
    const val = 'bnf';
    writeSyntax(val);
    expect(window.localStorage.getItem(SYN_KEY)).toBe(val);
    expect(readSyntax()).toBe(val);
  });

  test('reading respects constraints', () => {
    window.localStorage.setItem(SYN_KEY, 'test');
    expect(readSyntax()).toBe('fcs');
  });

  test('writing respects constraints', () => {
    const def = 'fcs';
    writeSyntax('value');
    expect(window.localStorage.getItem(SYN_KEY)).toBe(def);
    expect(readSyntax()).toBe(def);
  });
});