import ComparableSet, { Comparable } from "./../set";

abstract class GSymbol {
  constructor(public symbol: string) {
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
  static construct(sym: string, strict = false) {
    return EmptySymbol.isEmpty(sym, strict) ? new EmptySymbol() : new Terminal(sym);
  }
  get [Symbol.toStringTag]() { return "Terminal" }
}
export class EmptySymbol extends Terminal {
  constructor() {
    super("");
  }
  static isEmpty(char: string, strict = false) {
    return char === '' || (!strict && (char === '^' || char === 'ε'));
  }
  get [Symbol.toStringTag]() { return "EmptySymbol" }
}

export type AnySymbol = Terminal | NonTerminal | undefined;
export type Rule = (Terminal | NonTerminal)[];

export class QueueElement {
  constructor(public rule: Rule, public before = "", public depth = 0, public nonTerminals = 0) {
  }
}

export class ParseState<Sym extends AnySymbol = AnySymbol> implements Comparable {
  constructor(public left: NonTerminal, public before: Rule, public symbol: Sym, public after: Rule, public origin: number) {
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
export type InferSym<T extends ParseState> = T extends ParseState<infer U> ? U : never;
export type NonNull<T extends ParseState> = ParseState<NonNullable<InferSym<T>>>;

export type ParseHandle = (char: string, literal: boolean) => void;
export class Parse {
  constructor(public handle: ParseHandle, public currentSymbol?: NonTerminal, public rule: Rule = [], public currentInput = '', public whitespace = '') {
  }
}
