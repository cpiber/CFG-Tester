
export const branchMatch = /(\\*)\|/g;
export const escapeMatch = /(\\(?:n|r|t|f))|\\(.)/g;

const EXP_DEPTH = 'cfg_maxdepth'; // to prevent infinite recursion
const EXP_NONTERM = 'cfg_maxnonterm'; // maximum non-terminals in a row

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
  private gen: Generator<string, undefined, never> | undefined = undefined;
  private maxDepth = +(window.localStorage.getItem(EXP_DEPTH) || 20);
  private maxNonTerms = +(window.localStorage.getItem(EXP_NONTERM) || 10);

  protected rules: { [key: string]: Rule[] } = {};
  abstract clear(): void;
  abstract checkExpandable(): void;

  protected initGenerator(startsym: string) {
    const g = this;
    // search all possible paths using BFS
    function* generator(queue: QueueElement[]): Generator<string, undefined, never> {
      let next: QueueElement | undefined;
      while ((next = queue.shift())) {
        let { rule, before, depth, nonTerminals } = next;
        let symbol = rule.shift();
        while (symbol instanceof Terminal) { // string all terminals together
          before += symbol.symbol;
          symbol = rule.shift();
          nonTerminals = 0;
        }
        if (symbol === undefined) { // no more symbols to process
          yield before;
          continue;
        }
        if (depth > g.maxDepth || nonTerminals > g.maxNonTerms)
          continue;
        // create a new branch for every possible path
        const applicable = g.rules[symbol.symbol];
        for (const nrule of applicable)
          queue.push(new QueueElement([...nrule, ...rule], before, depth + 1, nonTerminals + 1));
      }
      return undefined;
    }
    this.gen = generator([new QueueElement([new NonTerminal(startsym)])]);
  }

  next(): string | undefined {
    if (!this.gen)
      throw new Error("Attempted to call .next without a generator, this should never happen!");
    return this.gen.next().value;
  }
}
