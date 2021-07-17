import FCSGrammar from "./fcsgrammar";
import { EmptySymbol, NonTerminal, Terminal } from "./grammartypes";

let debug: typeof console.debug;
beforeAll(() => {
  debug = console.debug;
  console.debug = () => { /* */ };
});
afterAll(() => {
  console.debug = debug;
});

test('simple rules', () => {
  const input1 = `S -> 1 | 2`;
  const g1 = new FCSGrammar(input1);
  expect(g1['rules']).toEqual({
    S: [
      [new Terminal('1')],
      [new Terminal('2')],
    ],
  });

  const input2 = `S -> 1
                  S -> 2`;
  const g2 = new FCSGrammar(input2);
  expect(g2['rules']).toEqual({
    S: [
      [new Terminal('1')],
      [new Terminal('2')],
    ],
  });

  const input3 = `S -> 1
                  S -> 2 | 3`;
  const g3 = new FCSGrammar(input3);
  expect(g3['rules']).toEqual({
    S: [
      [new Terminal('1')],
      [new Terminal('2')],
      [new Terminal('3')],
    ],
  });

  const input4 = `S -> A
                  A -> 2`;
  const g4 = new FCSGrammar(input4);
  expect(g4['rules']).toEqual({
    S: [
      [new NonTerminal('A')],
    ],
    A: [
      [new Terminal('2')],
    ],
  });
});

test('special cases', () => {
  const input1 = `S -> 1 | 2\\n`;
  const g1 = new FCSGrammar(input1);
  expect(g1['rules']).toEqual({
    S: [
      [new Terminal('1')],
      [new Terminal('2\n')],
    ],
  });

  const input2 = `S -> 1\\\n2`; // escape newline
  const g2 = new FCSGrammar(input2);
  expect(g2['rules']).toEqual({
    S: [
      [new Terminal('12')],
    ],
  });

  const input3 = `S -> A
                  S -> 2`;
  const g3 = new FCSGrammar(input3);
  expect(g3['rules']).toEqual({
    S: [
      [new Terminal('A')],
      [new Terminal('2')],
    ],
  });

  const input4 = `S -> \\AA
                  A -> 2`;
  const g4 = new FCSGrammar(input4);
  expect(g4['rules']).toEqual({
    S: [
      [new Terminal('A'), new NonTerminal('A')],
    ],
    A: [
      [new Terminal('2')],
    ],
  });
  
  const input5 = `S -> 1 | `;
  const g5 = new FCSGrammar(input5);
  expect(g5['rules']).toEqual({
    S: [
      [new Terminal('1')],
      [new EmptySymbol()],
    ],
  });

  const input6 = `S → 1 | 2`;
  const g6 = new FCSGrammar(input6);
  expect(g6['rules']).toEqual({
    S: [
      [new Terminal('1')],
      [new Terminal('2')],
    ],
  });
});

test('invalid input', () => {
  const input1 = `S`;
  expect(() => new FCSGrammar(input1)).toThrow(new Error(`Unexpected line ending, expected rule indicator at line 1, column 2`));

  const input2 = `\\ S ->`;
  expect(() => new FCSGrammar(input2)).toThrow(new Error(`Unexpected literal ' ' at line 1, column 2`));

  const input3 = `S -`;
  expect(() => new FCSGrammar(input3)).toThrow(new Error(`Unexpected line ending, expected rule indicator at line 1, column 4`));

  const input4 = `S -!`;
  expect(() => new FCSGrammar(input4)).toThrow(new Error(`Expected '>', got '!' at line 1, column 4`));

  const input5 = `s ->`;
  expect(() => new FCSGrammar(input5)).toThrow(new Error(`Unexpected 's', expected Non-Terminal at line 1, column 1`));
});