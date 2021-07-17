import ComparableSet, { Comparable } from "./set";

abstract class GSymbol {
  symbol: string;
  constructor(symbol: string) {
    this.symbol = symbol;
  }

  abstract equals(other: GSymbol): boolean;
}
export class NonTerminal extends GSymbol {
  equals(other: GSymbol): boolean {
    return other instanceof NonTerminal && other.symbol === this.symbol;
  }
  get [Symbol.toStringTag]() { return "NonTerminal" }
}
export class Terminal extends GSymbol {
  equals(other: GSymbol): boolean {
    return other instanceof Terminal && other.symbol === this.symbol;
  }
  static construct(sym: string) {
    return EmptySymbol.isEmpty(sym) ? new EmptySymbol() : new Terminal(sym);
  }
  get [Symbol.toStringTag]() { return "Terminal" }
}
export class EmptySymbol extends Terminal {
  constructor() {
    super("");
  }
  static isEmpty(char: string) {
    return char === '' || char === '^' || char === 'ε';
  }
  get [Symbol.toStringTag]() { return "EmptySymbol" }
}

export type AnySymbol = Terminal | NonTerminal | undefined;
export type Rule = (Terminal | NonTerminal)[];

export class QueueElement {
  rule: Rule;
  before: string;
  depth: number;
  nonTerminals: number;
  constructor(rule: Rule, before = "", depth = 0, nonTerminals = 0) {
    this.rule = rule;
    this.before = before;
    this.depth = depth;
    this.nonTerminals = nonTerminals;
  }
}

export class ParseState<Sym extends AnySymbol = AnySymbol> implements Comparable {
  left: NonTerminal;
  before: Rule;
  symbol: Sym;
  after: Rule;
  origin: number;
  constructor(left: NonTerminal, before: Rule, symbol: Sym, after: Rule, origin: number) {
    this.left = left;
    this.before = before;
    this.symbol = symbol;
    this.after = after;
    this.origin = origin;
  }
  isFinished(): this is ParseState<undefined> { return this.symbol === undefined || this.symbol instanceof EmptySymbol; }
  isTerminal(): this is ParseState<Terminal> { return this.symbol instanceof Terminal; }
  isNonTerminal(): this is ParseState<NonTerminal> { return this.symbol instanceof NonTerminal; }

  hash() {
    const str = (cur: AnySymbol) => (cur instanceof NonTerminal ? `\x01${cur.symbol}\x01` : cur?.symbol || '');
    const r = (prev: string, cur: AnySymbol) => prev + str(cur);
    return `${this.left.symbol}→${this.before.reduce(r, '')}\x02•${str(this.symbol)}${this.after.reduce(r, '')}\x03,${this.origin}`;
  }
}
export type ParseStateSet = ComparableSet<ParseState>[];

export type ParseHandle = (char: string, literal: boolean) => void;
export class Parse {
  handle: ParseHandle;
  currentSymbol: NonTerminal | undefined;
  currentInput = "";
  whitespace = "";
  rule: Rule = [];
  constructor(handle: ParseHandle, symbol?: NonTerminal, input?: string, whitespace?: string) {
    this.handle = handle;
    this.currentSymbol = symbol;
    this.currentInput = input || '';
    this.whitespace = whitespace || '';
  }
}
