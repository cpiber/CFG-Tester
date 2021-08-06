import each from 'jest-each';
import BNFGrammar from './bnfgrammar';
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
    ['one line two branches', `<start> ::= "1" | "2"`, {
      start: [
        [new Terminal('1')],
        [new Terminal('2')],
      ],
    }],
    ['redeclaration of symbols', `<start> ::= "1"\n<start> ::= "2"`, {
      start: [
        [new Terminal('1')],
        [new Terminal('2')],
      ],
    }],
    ['whitespace', `  <start> ::= "1"  \n  <start>  ::=  "2"  `, {
      start: [
        [new Terminal('1')],
        [new Terminal('2')],
      ],
    }],
    ['combination of branch declarations', `<start> ::= "1"\n<start> ::= "2" | "3"`, {
      start: [
        [new Terminal('1')],
        [new Terminal('2')],
        [new Terminal('3')],
      ],
    }],
    ['using non-terminal before declaration', `<start> ::= <A>\n<A> ::= "2"`, {
      start: [
        [new NonTerminal('A')],
      ],
      A: [
        [new Terminal('2')],
      ],
    }],
    ['empty line', `<start> ::= "1"\n\n<start> ::= "2"`, {
      start: [
        [new Terminal('1')],
        [new Terminal('2')],
      ],
    }],
    ['empty line with whitespace', `\n   \n<start> ::= "2"`, {
      start: [
        [new Terminal('2')],
      ],
    }],
    ['single quotes in double', `<start> ::= "'"`, {
      start: [
        [new Terminal("'")],
      ],
    }],
    ['single quotes in double', `<start> ::= '"'`, {
      start: [
        [new Terminal('"')],
      ],
    }],
  ]).test('%s', (_, input, output) => {
    expect(new BNFGrammar(input)["rules"]).toEqual(output);
  });
});

describe('special cases', () => {
  each([
    ['given newline etc', `<start> ::= "1" | "2\\n\\t\\r\\f"`, {
      start: [
        [new Terminal('1')],
        [new Terminal('2\n\t\r\f')],
      ],
    }],
    ['escape newline', `<start> ::= "1"\\\n"2"`, {
      start: [
        [new Terminal('12')],
      ],
    }],
    ['non-terminal as terminal', `<start> ::= "A" <A>\n<A> ::= "2"`, {
      start: [
        [new Terminal('A'), new NonTerminal('A')],
      ],
      A: [
        [new Terminal('2')],
      ],
    }],
    ['control characters in input', `<start> \x01::= "1" | "2"`, {
      start: [
        [new Terminal('1')],
        [new Terminal('2')],
      ],
    }],
    ['merging', `<start> ::= "a" "" "A" "b"`, {
      start: [
        [new Terminal('aAb')],
      ]
    }],
    ['merging with empty before', `<start> ::= "" "" "a" "" "A" "b"`, {
      start: [
        [new Terminal('aAb')],
      ]
    }],
    ['merging with empty after', `<start> ::= "a" "" "A" "b" ""`, {
      start: [
        [new Terminal('aAb')],
      ]
    }],
    ['mergin with just empty', `<start> ::= "" ""`, {
      start: [
        [new EmptySymbol()],
      ]
    }],
    ['purging empty before', `<start> ::= "" <A>\n<A> ::= "a"`, {
      start: [
        [new NonTerminal('A')],
      ],
      A: [
        [new Terminal('a')],
      ]
    }],
    ['purging empty after', `<start> ::= <A> "" ""\n<A> ::= "a"`, {
      start: [
        [new NonTerminal('A')],
      ],
      A: [
        [new Terminal('a')],
      ]
    }],
  ]).test('%s', (_, input, output) => {
    expect(new BNFGrammar(input)["rules"]).toEqual(output);
  });
});

describe('invalid input', () => {
  each([
    [`Unexpected line ending, expected rule indicator`, `<start>`],
    [`Unexpected literal ' '`, `\\ <start> ::= ""`],
    [`Unexpected literal ' '`, `<start>\\ ::= ""`],
    [`Unexpected line ending, expected rule indicator`, `<start> :`],
    [`Unexpected line ending, expected rule indicator`, `<start> ::`],
    [`Expected ':', got '!'`, `<start> :!`],
    [`Expected '=', got '!'`, `<start> ::!`],
    [`Expected '::=', got '!'`, `<start> !`],
    [`Unexpected 's', expected '<'`, `s ::= ""`],
    [`Unexpected line ending, symbol declaration ended early`, `<start ::= ""`],
    [`Branches must not be empty`, `<start> ::= "1" | `],
    [`Empty non-terminals not allowed`, `<> ::= "1"`],
    [`Empty non-terminals not allowed`, `<start> ::= <>`],
    [`Expected '<', '"', or ''', got 'a'`, `<start> ::= a`],
    [`Expected '<', '"', or ''', got literal '"'`, `<start> ::= \\"a"`],
    [`Undeclared symbol`, `<start> ::= <t>`],
  ]).test('%s', (err, input) => {
    expect(() => new BNFGrammar(input)).toThrow(err);
  });

  test('Error has correct line and col number', () => {
    expect(() => new BNFGrammar(`<start>`)).toThrow(`Unexpected line ending, expected rule indicator at line 1, column 8`);
  });

  test('Error has correct line and col number new line', () => {
    expect(() => new BNFGrammar(`<start>\\\n:`)).toThrow(`Unexpected line ending, expected rule indicator at line 2, column 2`);
  });
});

describe('per-grammar overrides', () => {
  test('checks for start symbol', () => {
    const g1 = new BNFGrammar(`<A> ::= "a"`);
    expect(() => g1.checkValid()).toThrow(`Startsymbol 'start' not found`);
    const g2 = new BNFGrammar(`<start> ::= "a"`);
    expect(() => g2.checkValid()).not.toThrow(`Startsymbol 'start' not found`);
  });

  test('clear and matches call private function with correct start symbol', () => {
    const mock = jest.fn();
    const g = new BNFGrammar(`<start> ::= "1"`);
    g["initGenerator"] = mock.mockImplementationOnce(a => a);
    g["match"] = mock.mockImplementationOnce((_, a) => a);
    g.clear();
    expect(mock).toHaveReturnedWith('start');
    g.matches('test');
    expect(mock).toHaveReturnedWith('start');
  });
});