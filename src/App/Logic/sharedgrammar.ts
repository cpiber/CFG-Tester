
export const branchMatch = /(\\*)\|/g;
export const escapeMatch = /(\\(?:n|r|t|f))|\\(.)/g;

const EXP_DEPTH = 'cfg_maxdepth'; // to prevent infinite recursion
const EXP_NONTERM = 'cfg_maxnonterm'; // maximum non-terminals in a row
const EXP_ITER = 'cfg_iter'; // maximum iterations between yields per call

interface GSymbol {
  symbol: string;
}
export class NonTerminal implements GSymbol {
  symbol: string;
  constructor(symbol: string) {
    this.symbol = symbol;
  }
}
export class Terminal implements GSymbol {
  symbol: string;
  constructor(symbol: string) {
    this.symbol = symbol;
  }
}
export class EmptySymbol extends Terminal {
  constructor() {
    super("");
  }
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

export abstract class Grammar {
  private gen: Generator<string | Error, undefined, never> | undefined = undefined;
  private maxDepth = +(window.localStorage.getItem(EXP_DEPTH) || 20);
  private maxNonTerms = +(window.localStorage.getItem(EXP_NONTERM) || 10);
  private maxIter = +(window.localStorage.getItem(EXP_ITER) || 5000);

  protected rules: { [key: string]: Rule[] } = {};
  abstract clear(): void;
  abstract checkExpandable(): void;

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
    const rule = next.rule;
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

  next(): string | Error | undefined {
    if (!this.gen)
      throw new Error("Attempted to call .next without a generator, this should never happen!");
    return this.gen.next().value;
  }
}
