import { EmptySymbol, NonTerminal, Parse, ParseState, NonNull as ParseStateNonNull, ParseStateSet, QueueElement, Rule, Terminal } from './grammartypes';
import ComparableSet from './set';

// eslint-disable-next-line no-control-regex
export const control = /[\u0000-\u0008\u000E-\u001f\u007f-\u009F]/; // control except whitespace https://stackoverflow.com/a/46637343/
export const whitespace = /\s/;

const EXP_DEPTH = 'cfg_maxdepth'; // to prevent infinite recursion
const EXP_NONTERM = 'cfg_maxnonterm'; // maximum non-terminals in a row
const EXP_ITER = 'cfg_iter'; // maximum iterations between yields per call

export abstract class Grammar {
  private gen: Generator<string | Error, undefined, never> | undefined = undefined;
  private maxDepth = +(window.localStorage.getItem(EXP_DEPTH) || 20);
  private maxNonTerms = +(window.localStorage.getItem(EXP_NONTERM) || 10);
  private maxIter = +(window.localStorage.getItem(EXP_ITER) || 5000);
  protected currentState: Parse;

  protected rules: { [key: string]: Rule[] } = {};
  abstract clear(): void;
  abstract matches(str: string): boolean;
  protected abstract checkParseValid(): void;

  constructor() {
    this.currentState = new Parse(() => { /* */ });
  }
  
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

  protected parseRules(rules: string, start: Parse, escape: string | RegExp) {
    this.currentState = start;

    let line = 0, column = 0;
    let literal = false;
    try {
      for (let i = 0; (column++, i < rules.length); i++) {
        const char = rules[i];
        if (char.match(control))
          console.debug(`Purged control character ${char} at ${i}`);
        else if (char.match(escape))
          literal = true;
        else if (char === '\n') {
          column = 0;
          line ++;
          if (!literal)
            this.endLine(start);
        } else {
          this.currentState.handle.call(this, char, literal);
          literal = false;
        }
      }
      this.endLine(start);
    } catch (e) {
      throw new Error(`${(e as Error).message} at line ${line + 1}, column ${column}`);
    }
  }

  protected checkBranch(char: string, literal: boolean, ignoreWhitespace: boolean) {
    if (this.currentState.currentInput === '' && !literal && !ignoreWhitespace && char.match(whitespace))
      return null;
    if (char === '|' && !literal) {
      this.endLine();
      return null;
    }
    if (char.match(whitespace)) {
      this.currentState.whitespace += char;
      return null;
    }
    if (literal)
      return this.toSpecial(char);
    return char;
  }

  private toSpecial(char: string) {
    if (char === 'n')
      return '\n';
    if (char === 't')
      return '\t';
    if (char === 'r')
      return '\r';
    if (char === 'f')
      return '\f';
    return char;
  }

  private endLine(start?: Parse) {
    this.checkParseValid();
    if (this.currentState.currentSymbol === undefined)
      return;
    const s = this.currentState.currentSymbol.symbol;
    const t = Terminal.construct(this.currentState.currentInput);
    if (this.currentState.rule.length === 0 || !(t instanceof EmptySymbol))
      this.currentState.rule.push(t);
    if (s in this.rules)
      this.rules[s].push(this.currentState.rule);
    else
      this.rules[s] = [this.currentState.rule];
    if (start)
      this.currentState = start;
    else {
      this.currentState.currentInput = '';
      this.currentState.whitespace = '';
      this.currentState.rule = [];
    }
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
        }
      }
    }

    return state[str.length].has(topc);
  }

  private completer(s: ParseState<undefined>, k: number, state: ParseStateSet) {
    for (const n of state[s.origin]) {
      if (n.isFinished())
        continue;
      const ns = n as ParseStateNonNull<typeof n>;
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
