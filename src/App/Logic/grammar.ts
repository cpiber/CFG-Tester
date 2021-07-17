import ComparableSet, { Comparable } from './set';

export const branchMatch = /(\\*)\|/g;
export const escapeMatch = /(\\(?:n|r|t|f))|\\(.)/g;
export const escapeNewline = /(^|[^\\])(\\\\)*\\$/g;

const EXP_DEPTH = 'cfg_maxdepth'; // to prevent infinite recursion
const EXP_NONTERM = 'cfg_maxnonterm'; // maximum non-terminals in a row
const EXP_ITER = 'cfg_iter'; // maximum iterations between yields per call

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
  get [Symbol.toStringTag]() { return "Terminal" }
}
export class EmptySymbol extends Terminal {
  constructor() {
    super("");
  }
  get [Symbol.toStringTag]() { return "EmptySymbol" }
}

export type Rule = (Terminal | NonTerminal)[];

class QueueElement {
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

type AnySymbol = Terminal | NonTerminal | undefined;
class ParseState<Sym extends AnySymbol = AnySymbol> implements Comparable {
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
    const str = (cur: AnySymbol) => (cur instanceof NonTerminal ? `\u0001${cur.symbol}\u0001` : cur?.symbol || '');
    const r = (prev: string, cur: AnySymbol) => prev + str(cur);
    return `${this.left.symbol}→${this.before.reduce(r, '')}\u0002•${str(this.symbol)}${this.after.reduce(r, '')}\u0003,${this.origin}`;
  }
}
type ParseStateSet = ComparableSet<ParseState>[];
export type { ParseState };

export abstract class Grammar {
  private gen: Generator<string | Error, undefined, never> | undefined = undefined;
  private maxDepth = +(window.localStorage.getItem(EXP_DEPTH) || 20);
  private maxNonTerms = +(window.localStorage.getItem(EXP_NONTERM) || 10);
  private maxIter = +(window.localStorage.getItem(EXP_ITER) || 5000);

  protected rules: { [key: string]: Rule[] } = {};
  abstract clear(): void;
  abstract matches(str: string): boolean;
  
  next(): string | Error | undefined {
    if (!this.gen)
      throw new Error("Attempted to call .next without a generator, this should never happen!");
    return this.gen.next().value;
  }
  
  checkValid(): void {
    // these are internal sanity checks, they should indeed never happen ;)
    for (const sym in this.rules) {
      const rules = this.rules[sym];
      for (const rule of rules) {
        if (rule.length === 0)
          throw new Error('Empty rule, this should never happen!');
        if (rule.length === 1 && rule[0].symbol === '' && !(rule[0] instanceof EmptySymbol))
          throw new Error('Empty symbol that isn\'t an EmptySymbol, this should never happen!');
        if (rule.length > 1 && rule.findIndex(s => s instanceof EmptySymbol || s.symbol.length === 0) !== -1)
          throw new Error('EmptySymbol found in a longer rule, this should never happen!');
      }
    }
  }

  protected prepareRules(rules: string) {
    // remove control characters and split into lines
    return rules.split(/\r\n|\r|\n/g).map((l, i, lines) => {
      const line = l.trim().replace(/[\u0000-\u001f\u007f-\u009F]/g, '');
      if (line === "") return null; // ignore empty lines
      if (line.match(escapeNewline)) {
        if (i + 1 === lines.length)
          return line.slice(0, line.length - 1);
        const newline = line.slice(0, line.length - 1) + lines[i + 1].trim();
        lines[i + 1] = "";
        return newline;
      }
      return line;
    });
  }

  protected toBranches(branch: string, branchToTerminal: (s: string) => Terminal) {
    const prep = (str: string) => str.trim().replace(/\\n/g, "\n").replace(/\\r/g, "\r").replace(/\\t/g, "\t").replace(/\\f/g, "\f");
    let newbranches: Terminal[] = [],
        bmatch: RegExpExecArray | null,
        lastIndex = 0;
    while ((bmatch = branchMatch.exec(branch)) !== null) {
      // even number of backslashes means they are not
      // escaping the |
      if (bmatch[1].length % 2 === 0) {
        const before = branch.substring(lastIndex, bmatch.index + bmatch[1].length);
        newbranches.push(branchToTerminal(prep(before)));
        lastIndex = branchMatch.lastIndex;
      }
    }
    const after = branch.substring(lastIndex);
    newbranches.push(branchToTerminal(prep(after)));
    return newbranches;
  }

  protected initGenerator(startsym: string) {
    const g = this;
    let iterSinceYield = 0;
    // search all possible paths using BFS
    function* generator(queue: QueueElement[]): Generator<string | Error, undefined, never> {
      let next: QueueElement | undefined;
      while ((next = queue.shift())) {
        iterSinceYield ++;
        let symbol = g.expandTerminal(next);
        const { rule, before, depth, nonTerminals } = next;
        if (symbol === undefined) { // no more symbols to process
          yield before;
          iterSinceYield = 0;
          continue;
        }
        if (iterSinceYield >= g.maxIter) {
          yield new Error(`Iterated ${iterSinceYield} times without finding a new value`);
          iterSinceYield = 0;
        }
        if (depth > g.maxDepth || nonTerminals > g.maxNonTerms)
          continue;
        g.expandNonTerminal(symbol, rule, queue, next);
      }
      return undefined;
    }
    this.gen = generator([new QueueElement([new NonTerminal(startsym)])]);
  }

  private expandTerminal(next: QueueElement) {
    const rule = next.rule
    let symbol = rule.shift();
    while (symbol instanceof Terminal) { // string all terminals together
      next.before += symbol.symbol;
      symbol = rule.shift();
      next.nonTerminals = 0;
    }
    return symbol;
  }

  private expandNonTerminal(symbol: Terminal, rule: Rule, queue: QueueElement[], next: QueueElement) {
    const { before, depth, nonTerminals } = next;
    // create a new branch for every possible path
    const applicable = this.rules[symbol.symbol];
    for (const nrule of applicable)
      queue.push(new QueueElement([...nrule, ...rule], before, depth + 1, nonTerminals + 1));
  }

  protected match(str: string, startsym: string): boolean {
    // https://en.wikipedia.org/wiki/Earley_parser#Pseudocode
    const state: ParseStateSet = [];
    state.push(new ComparableSet());
    const top  = new ParseState(new NonTerminal(''), [], new NonTerminal(startsym), [], 0);
    const topc = new ParseState(new NonTerminal(''), [new NonTerminal(startsym)], undefined, [], 0);
    state[0].add(top);

    // for each 'word'
    for (let k = 0; k <= str.length; k++) { // need to finish up after the last character
      state.push(new ComparableSet()); // k+1

      for (const s of state[k]) { // state[k] can expand
        if (s.isFinished()) {
          this.completer(s, k, state);
        } else if (s.isNonTerminal()) {
          this.predictor(s, k, state);
        } else if (s.isTerminal()) {
          this.scanner(s, k, state, str);
        } else {
          throw new Error('Unknown symbol type, this should never happen!');
        }
      }
    }
    
    return state[str.length].has(topc);
  }

  private completer(s: ParseState<undefined>, k: number, state: ParseStateSet) {
    for (const n of state[s.origin]) {
      if (n.isFinished())
        continue;
      const ns = n as ParseState<Terminal | NonTerminal>;
      if (ns.symbol.equals(s.left))
        this.nextInRule(ns, k, state);
    }
  }

  private predictor(s: ParseState<NonTerminal>, k: number, state: ParseStateSet) {
    for (const rule of this.rules[s.symbol.symbol]) {
      state[k].add(new ParseState(s.symbol, [], rule[0], rule.slice(1), k));
    }
  }

  private scanner(s: ParseState<Terminal>, k: number, state: ParseStateSet, str: string) {
    if (k === str.length) // nothing to scan if we're at the end of the string
      return;
    if (str[k] === s.symbol.symbol[0]) {
      this.nextInRule(s, k + 1, state);
    }
  }

  private nextInRule(n: ParseState<Terminal | NonTerminal>, k: number, state: ParseStateSet) {
    // need to go to next symbol in rule
    // terminals can be multiple chars long, so pop first, otherwise go to next in rule
    const before = [...n.before];
    if (n.symbol instanceof Terminal) {
      const l = before.length - 1;
      if (before[l] instanceof Terminal) {
        before[l] = new Terminal(before[l].symbol + n.symbol.symbol[0]);
      } else {
        before.push(new Terminal(n.symbol.symbol[0]));
      }
    } else {
      before.push(n.symbol);
    }

    if (n.symbol instanceof Terminal && n.symbol.symbol.length > 1) {
      state[k].add(new ParseState(n.left, before, new Terminal(n.symbol.symbol.slice(1)), [...n.after], n.origin));
    } else {
      state[k].add(new ParseState(n.left, before, n.after[0], n.after.slice(1), n.origin));
    }
  }
}
