import { Grammar, NonTerminal, Parse, Rule, Terminal, whitespace } from '.';
import { EmptySymbol } from './grammartypes';

const escape = /[\\]/;


class BNFGrammar extends Grammar {
  constructor(rules: string) {
    super();
    this.parseRules(rules, new Parse(this.parseLeftStart), escape);
    this.checkHasUndeclaredTerminals();
    for (const sym in this.rules) {
      const r = this.rules[sym];
      for (const rule of r) {
        this.fixTerminals(rule);
      }
    }
  }

  private parseLeftStart(char: string, literal: boolean) {
    if (char.match(whitespace)) {
      if (literal)
        throw new Error(`Unexpected literal '${char}'`);
      return; // ignore whitespace
    }
    if (char !== '<')
      throw new Error(`Unexpected '${char}', expected '<'`);
    this.currentState = new Parse(this.parseLeft, undefined);
  }

  private parseLeft(char: string, literal: boolean) {
    if (char === '>' && !literal) {
      if (this.currentState.currentInput === '')
        throw new Error('Empty non-terminals not allowed');
      this.currentState = new Parse(this.parseIndicator, new NonTerminal(this.currentState.currentInput));
      return;
    }
    this.currentState.currentInput += char;
  }

  private parseIndicator(char: string, literal: boolean) {
    if (this.currentState.currentInput === ':') {
      if (char !== ':')
        throw new Error(`Expected ':', got '${char}'`);
      this.currentState.currentInput = '::';
      return;
    }
    if (this.currentState.currentInput === '::') {
      if (char !== '=')
        throw new Error(`Expected '=', got '${char}'`);
      this.currentState = new Parse(this.parseBranches, this.currentState.currentSymbol);
      return;
    }
    if (char.match(whitespace)) {
      if (literal)
        throw new Error(`Unexpected literal '${char}'`);
      return; // ignore whitespace
    }
    if (char !== ':')
      throw new Error(`Expected '::=', got '${char}'`);
    this.currentState.currentInput = ':';
  }

  private parseBranches(char: string, literal: boolean) {
    const nchar = this.checkBranch(char, literal, true);
    if (nchar === null)
      return;
    if (char.match(whitespace)) {
      if (literal)
        throw new Error(`Unexpected literal '${char}'`);
      return; // ignore whitespace
    }
    if (char === '<' && !literal) {
      this.currentState = new Parse(this.parseNonTerminal, this.currentState.currentSymbol, this.currentState.rule);
      return;
    }
    if (char === '"' && !literal) {
      this.currentState = new Parse(this.parseTerminal, this.currentState.currentSymbol, this.currentState.rule, '', '', '"');
      return;
    }
    if (char === "'" && !literal) {
      this.currentState = new Parse(this.parseTerminal, this.currentState.currentSymbol, this.currentState.rule, '', '', "'");
      return;
    }
    throw new Error(`Expected '<', '"', or ''', got${literal ? ' literal' : ''} '${char}'`);
  }

  private parseNonTerminal(char: string, literal: boolean) {
    if (char === '>' && !literal) {
      if (this.currentState.currentInput === '')
        throw new Error('Empty non-terminals not allowed');
      this.currentState.rule.push(new NonTerminal(this.currentState.currentInput));
      this.currentState = new Parse(this.parseBranches, this.currentState.currentSymbol, this.currentState.rule);
      return;
    }
    this.currentState.currentInput += char;
  }

  private parseTerminal(char: string, literal: boolean) {
    if (char === this.currentState.data && !literal) {
      this.currentState.rule.push(Terminal.construct(this.currentState.currentInput, true));
      this.currentState = new Parse(this.parseBranches, this.currentState.currentSymbol, this.currentState.rule);
      return;
    }
    if (literal)
      char = this.toSpecial(char);
    this.currentState.currentInput += char;
  }

  protected checkParseValid() {
    if (this.currentState.handle === this.parseIndicator)
      throw new Error('Unexpected line ending, expected rule indicator');
    if (this.currentState.handle === this.parseLeft || this.currentState.handle === this.parseNonTerminal || this.currentState.handle === this.parseTerminal)
      throw new Error('Unexpected line ending, symbol declaration ended early');
    if (this.currentState.handle === this.parseBranches && this.currentState.rule.length === 0)
      throw new Error('Branches must not be empty, put at least one symbol');
  }

  private checkHasUndeclaredTerminals() {
    for (const sym in this.rules) {
      const r = this.rules[sym];
      for (const rule of r) {
        for (const s of rule) {
          if (!(s instanceof NonTerminal))
            continue;
          if (s.symbol in this.rules)
            continue;
          throw new Error(`Undeclared symbol ${s.symbol}`);
        }
      }
    }
  }

  private fixTerminals(rule: Rule) {
    // purge empty symbols
    for (let i = rule.length - 1; i >= 0 && rule.length > 1; i--) {
      if (!(rule[i] instanceof EmptySymbol))
        continue;
      rule.splice(i, 1);
    }
    this.mergeTerminals(rule);
  }

  clear() {
    this.initGenerator('start');
  }

  checkValid() {
    super.checkValid();
    if (!('start' in this.rules))
      throw new Error("Startsymbol 'start' not found");
  }

  matches(str: string) {
    return this.match(str, 'start');
  }
}

export default BNFGrammar;