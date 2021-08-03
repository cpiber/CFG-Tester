import { Grammar, EmptySymbol, NonTerminal, Rule, Terminal } from '.';

export class TestGrammar extends Grammar {
  constructor(rules: { [key: string]: Rule[] }) {
    super();
    this.rules = rules;
  }

  clear(): void {
    this.initGenerator('Start');
  }
  matches(str: string): boolean {
    return this.match(str, 'Start');
  }
  protected checkParseValid(): void {
    throw new Error("Method not implemented.");
  }

  checkValid() {
    super.checkValid();
    if (!('Start' in this.rules))
      throw new Error("Startsymbol 'Start' not found");
  }
}

export class NonFunctionalGrammar extends Grammar {
  constructor(private valid: jest.Mock) {
    super();
  }

  clear(): void {
    // do nothing
  }
  matches(_: string): boolean {
    return true;
  }
  protected checkParseValid(): void {
    throw new Error('Method not implemented.');
  }
  checkValid() {
    super.checkValid();
    this.valid();
  }
}

describe('generating strings', () => {
  test('simple rules', () => {
    const rules = {
      Start: [
        [new Terminal('1')],
        [new Terminal('2')],
        [new Terminal('3')],
        [new EmptySymbol()],
      ]
    };
    const grammar = new TestGrammar(rules);
    expect(() => grammar.next()).toThrow(/without a generator/);
    grammar.clear();
    expect(grammar.next()).toBe('1');
    expect(grammar.next()).toBe('2');
    expect(grammar.next()).toBe('3');
    expect(grammar.next()).toBe('');
    expect(grammar.next()).toBe(undefined);
  });

  test('newline', () => {
    const rules = {
      Start: [
        [new Terminal('\n')],
      ]
    };
    const grammar = new TestGrammar(rules);
    grammar.clear();
    expect(grammar.next()).toBe('\n');
    expect(grammar.next()).toBe(undefined);
  });

  test('recursion', () => {
    const rules = {
      Start: [
        [new Terminal('1'), new NonTerminal('Start')],
        [new Terminal('2')],
      ]
    };
    const grammar = new TestGrammar(rules);
    grammar.clear();
    expect(grammar.next()).toBe('2');
    expect(grammar.next()).toBe('12');
    expect(grammar.next()).toBe('112');
    expect(grammar.next()).toBe('1112');
  });

  test('double recursion', () => {
    const rules = {
      Start: [
        [new NonTerminal('A')],
        [new NonTerminal('B')],
      ],
      A: [
        [new NonTerminal('Start'), new Terminal('1')],
        [new Terminal('2')],
      ],
      B: [
        [new NonTerminal('Start'), new Terminal('a')],
        [new Terminal('b')],
      ],
    };
    const grammar = new TestGrammar(rules);
    grammar.clear();
    const strings = [];
    for (let i = 0; i < 10; i++)
      strings.push(grammar.next());
    const expected = ['2', 'b', '21', 'b1', '2a', 'ba', '211', 'b11', '2a1', 'ba1'];
    expect(strings).toEqual(expected);
  });

  test('invalid rules', () => {
    const g1 = new TestGrammar({});
    expect(() => g1.checkValid()).toThrow(new Error("Startsymbol 'Start' not found"));
    const g2 = new TestGrammar({ Start: [[]] });
    expect(() => g2.checkValid()).toThrow(new Error('Empty rule, this should never happen!'));
    const g3 = new TestGrammar({ Start: [[new Terminal('')]] });
    expect(() => g3.checkValid()).toThrow(new Error('Empty symbol that isn\'t an EmptySymbol, this should never happen!'));
    const g4 = new TestGrammar({ Start: [[new Terminal('a'), new EmptySymbol()]] });
    expect(() => g4.checkValid()).toThrow(new Error('EmptySymbol found in a longer rule, this should never happen!'));
  });
});

describe('matching', () => {
  test('simple rules', () => {
    const rules = {
      Start: [
        [new Terminal('1')],
        [new Terminal('2')],
        [new Terminal('3')],
        [new EmptySymbol()],
      ]
    };
    const grammar = new TestGrammar(rules);
    expect(grammar.matches('1')).toBe(true);
    expect(grammar.matches('2')).toBe(true);
    expect(grammar.matches('3')).toBe(true);
    expect(grammar.matches('')).toBe(true);
    expect(grammar.matches('4')).toBe(false);
    expect(grammar.matches('12')).toBe(false);
    expect(grammar.matches('\n')).toBe(false);
  });

  test('newline', () => {
    const rules = {
      Start: [
        [new Terminal('\n')],
      ]
    };
    const grammar = new TestGrammar(rules);
    expect(grammar.matches('\n')).toBe(true);
    expect(grammar.matches('')).toBe(false);
  });

  test('recursion', () => {
    const rules = {
      Start: [
        [new Terminal('1'), new NonTerminal('Start')],
        [new Terminal('2')],
      ]
    };
    const grammar = new TestGrammar(rules);
    expect(grammar.matches('2')).toBe(true);
    expect(grammar.matches('12')).toBe(true);
    expect(grammar.matches('112')).toBe(true);
    expect(grammar.matches('1112')).toBe(true);
    expect(grammar.matches('1')).toBe(false);
    expect(grammar.matches('22')).toBe(false);
  });

  test('double recursion', () => {
    const rules = {
      Start: [
        [new NonTerminal('A')],
        [new NonTerminal('B')],
      ],
      A: [
        [new NonTerminal('Start'), new Terminal('1')],
        [new Terminal('2')],
      ],
      B: [
        [new NonTerminal('Start'), new Terminal('a')],
        [new Terminal('b')],
      ],
    };
    const grammar = new TestGrammar(rules);
    const expected = ['2', 'b', '21', 'b1', '2a', 'ba', '211', 'b11', '2a1', 'ba1'];
    expected.forEach(v => {
      expect(grammar.matches(v)).toBe(true);
    });
  });
});

test('stringTags are correct', () => {
  expect(new Terminal('')[Symbol.toStringTag]).toBe("Terminal");
  expect(new NonTerminal('')[Symbol.toStringTag]).toBe("NonTerminal");
  expect(new EmptySymbol()[Symbol.toStringTag]).toBe("EmptySymbol");
});

test('constructing and comparing symbols correct', () => {
  expect(Terminal.construct('')).toEqual(new EmptySymbol());
  expect(Terminal.construct(' ')).toEqual(new Terminal(' '));

  expect(new Terminal(' ').equals(new Terminal(' '))).toBeTruthy();
  expect(new Terminal('').equals(new EmptySymbol())).toBeTruthy();
  expect(new Terminal(' ').equals(new NonTerminal(' '))).toBeFalsy();
});