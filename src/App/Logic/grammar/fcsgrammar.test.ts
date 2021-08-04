import each from 'jest-each';
import FCSGrammar from './fcsgrammar';
import { EmptySymbol, NonTerminal, Terminal } from '.';

let debug: typeof console.debug;
beforeAll(() => {
  debug = console.debug;
  console.debug = () => { /* */ };
});
afterAll(() => {
  console.debug = debug;
});

describe('simple rules', () => {
  each([
    ['one line two branches', `S -> 1 | 2`, {
      S: [
        [new Terminal('1')],
        [new Terminal('2')],
      ],
    }],
    ['redeclaration of symbols', `S -> 1\nS -> 2`, {
      S: [
        [new Terminal('1')],
        [new Terminal('2')],
      ],
    }],
    ['whitespace', `  S -> 1  \n  S  ->  2  `, {
      S: [
        [new Terminal('1')],
        [new Terminal('2')],
      ],
    }],
    ['combination of branch declarations', `S -> 1\nS -> 2 | 3`, {
      S: [
        [new Terminal('1')],
        [new Terminal('2')],
        [new Terminal('3')],
      ],
    }],
    ['using non-terminal before declaration', `S -> A\nA -> 2`, {
      S: [
        [new NonTerminal('A')],
      ],
      A: [
        [new Terminal('2')],
      ],
    }],
    ['empty line', `S -> 1\n\nS -> 2`, {
      S: [
        [new Terminal('1')],
        [new Terminal('2')],
      ],
    }],
    ['empty line with whitespace', `\n   \nS -> 2`, {
      S: [
        [new Terminal('2')],
      ],
    }],
  ]).test('%s', (_, input, output) => {
    expect(new FCSGrammar(input)["rules"]).toEqual(output);
  });
});

describe('special cases', () => {
  each([
    ['given newline etc', `S -> 1 | 2\\n\\t\\r\\f`, {
      S: [
        [new Terminal('1')],
        [new Terminal('2\n\t\r\f')],
      ],
    }],
    ['escape newline', `S -> 1\\\n2`, {
      S: [
        [new Terminal('12')],
      ],
    }],
    ['newline', `S -> A\nS -> 2`, {
      S: [
        [new Terminal('A')],
        [new Terminal('2')],
      ],
    }],
    ['escape non-terminal', `S -> \\AA\nA -> 2`, {
      S: [
        [new Terminal('A'), new NonTerminal('A')],
      ],
      A: [
        [new Terminal('2')],
      ],
    }],
    ['empty branch', `S -> 1 | `, {
      S: [
        [new Terminal('1')],
        [new EmptySymbol()],
      ],
    }],
    ['other rule indicator', `S → 1 | 2`, {
      S: [
        [new Terminal('1')],
        [new Terminal('2')],
      ],
    }],
    ['control characters in input', `S \x01-> 1 | 2`, {
      S: [
        [new Terminal('1')],
        [new Terminal('2')],
      ],
    }],
    ['converting and merging', `S -> aAb`, {
      S: [
        [new Terminal('aAb')],
      ]
    }],
  ]).test('%s', (_, input, output) => {
    expect(new FCSGrammar(input)["rules"]).toEqual(output);
  });
});

describe('invalid input', () => {
  each([
    [`Unexpected line ending, expected rule indicator`, `S`],
    [`Unexpected literal ' '`, `\\ S ->`],
    [`Unexpected literal ' '`, `S\\ ->`],
    [`Unexpected line ending, expected rule indicator`, `S -`],
    [`Expected '>', got '!'`, `S -!`],
    [`Expected '->' or '→', got '!'`, `S !`],
    [`Unexpected 's', expected Non-Terminal`, `s ->`],
  ]).test('%s', (err, input) => {
    expect(() => new FCSGrammar(input)).toThrow(err);
  });

  test('Error has correct line and col number', () => {
    expect(() => new FCSGrammar(`S`)).toThrow(`Unexpected line ending, expected rule indicator at line 1, column 2`);
  });

  test('Error has correct line and col number new line', () => {
    expect(() => new FCSGrammar(`S\\\n-`)).toThrow(`Unexpected line ending, expected rule indicator at line 2, column 2`);
  });
});

describe('per-grammar overrides', () => {
  test('checks for start symbol', () => {
    const g1 = new FCSGrammar(`A -> a`);
    expect(() => g1.checkValid()).toThrow(`Startsymbol 'S' not found`);
    const g2 = new FCSGrammar(`S -> a`);
    expect(() => g2.checkValid()).not.toThrow(`Startsymbol 'S' not found`);
  });

  test('clear and matches call private function with correct start symbol', () => {
    const mock = jest.fn();
    const g = new FCSGrammar(`S -> 1`);
    g["initGenerator"] = mock.mockImplementationOnce(a => a);
    g["match"] = mock.mockImplementationOnce((_, a) => a);
    g.clear();
    expect(mock).toHaveReturnedWith('S');
    g.matches('test');
    expect(mock).toHaveReturnedWith('S');
  });
});