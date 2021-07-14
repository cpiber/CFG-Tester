
export const branchMatch = /(\\*)\|/g;
export const escapeMatch = /(\\(?:n|r|t|f))|\\(.)/g;

const EXP_DEPTH = 'cfg_maxdepth'; // to prevent infinite recursion
const EXP_NONTERM = 'cfg_maxnonterm'; // maximum non-terminals in a row
const EXP_PROBS = 'cfg_maxproblems'; // maximum problems in a row

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

export abstract class Grammar {
  private gen: Generator<string, undefined, never> | undefined = undefined;
  private maxDepth = +(window.localStorage.getItem(EXP_DEPTH) || 50);
  private maxNonTerms = +(window.localStorage.getItem(EXP_NONTERM) || 30);
  private maxProbs = +(window.localStorage.getItem(EXP_PROBS) || 100);

  protected rules: { [key: string]: Rule[] } = {};
  abstract clear(): void;
  abstract checkExpandable(): void;

  protected initGenerator(startsym: string) {
    const g = this;
    let problems = 0;
    function* generator(
      rule: Rule,
      before = "",
      depth = 0,
      consecutiveNonTerminals = 0
    ): Generator<string, undefined, never> {
      let symbol = rule.shift();
      while (symbol instanceof Terminal) { // string all terminals together
        before += symbol.symbol;
        symbol = rule.shift();
        consecutiveNonTerminals = 0;
      }
      if (symbol === undefined) { // no more symbols to process
        problems = 0;
        yield before;
        return undefined;
      }
      if (problems > g.maxProbs) {
        console.debug(depth, g.maxDepth, consecutiveNonTerminals, g.maxNonTerms, problems, g.maxProbs);
        problems++;
        return undefined;
      }
      // create a new branch for every possible path
      if (!(symbol.symbol in g.rules))
        throw new Error(`Attempted to expand grammar with invalid non-terminal '${symbol.symbol}', this should never happen!`);
      const applicable = g.rules[symbol.symbol];
      for (const nrule of applicable) {
        if (nrule[0] instanceof NonTerminal && (depth > g.maxDepth || consecutiveNonTerminals > g.maxNonTerms)) {
          problems++;
          continue;
        }
        yield* generator([...nrule, ...rule], before, depth + 1, consecutiveNonTerminals + 1);
      }
    }
    this.gen = generator([new NonTerminal(startsym)]);
  }

  next(): string | undefined {
    if (!this.gen)
      throw new Error("Attempted to call .next without a generator, this should never happen!");
    return this.gen.next().value;
  }
}
