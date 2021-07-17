import { Grammar, whitespace } from "./grammar";
import { NonTerminal, Parse, Rule, Terminal } from "./grammartypes";

const nonTerminal = /[A-Z]/;
const escape = /[\\]/;


class FCSGrammar extends Grammar {
  constructor(rules: string) {
    super();
    this.parseRules(rules, new Parse(this.parseLeft), escape);
    for (const sym in this.rules) {
      const r = this.rules[sym];
      for (const rule of r) {
        this.extractTerminals(rule);
      }
    }
  }

  private parseLeft(char: string, literal: boolean) {
    if (char.match(whitespace)) {
      if (literal)
        throw new Error(`Unexpected literal '${char}'`);
      return; // ignore whitespace
    }
    if (!char.match(nonTerminal) || this.currentState.currentSymbol !== undefined)
      throw new Error(`Unexpected '${char}', expected Terminal`);
    this.currentState = new Parse(this.parseIndicator, new NonTerminal(char));
  }

  private parseIndicator(char: string, literal: boolean) {
    if (this.currentState.currentInput === '-') {
      if (char !== '>')
        throw new Error(`Expected '>', got '${char}'`);
      this.currentState = new Parse(this.parseBranches, this.currentState.currentSymbol);
      return;
    }
    if (char.match(whitespace)) {
      if (literal)
        throw new Error(`Unexpected literal '${char}'`);
      return; // ignore whitespace
    }
    if (!char.match(/[→-]/))
      throw new Error(`Expected '->' or '→', got '${char}'`);
    if (char === '-')
      this.currentState.currentInput = '-';
    else
      this.currentState = new Parse(this.parseBranches, this.currentState.currentSymbol);
  }

  private parseBranches(char: string, literal: boolean) {
    const nchar = this.checkBranch(char, literal, this.currentState.rule.length !== 0);
    if (nchar === null)
      return;
    if (char.match(nonTerminal) && !literal) {
      if (this.currentState.currentInput !== '' || this.currentState.whitespace !== '')
        this.currentState.rule.push(Terminal.construct(this.currentState.currentInput + this.currentState.whitespace));
      this.currentState.rule.push(new NonTerminal(nchar));
      this.currentState.currentInput = '';
    } else {
      this.currentState.currentInput += this.currentState.whitespace + nchar;
    }
    this.currentState.whitespace = '';
  }

  protected checkParseValid() {
    if (this.currentState.handle === this.parseIndicator)
      throw new Error('Unexpected line ending, expected rule indicator');
  }

  private extractTerminals(rule: Rule) {
    // convert all non-existant non-terminals to terminals
    for (let i = 0; i < rule.length; i++) {
      if (!(rule[i] instanceof NonTerminal))
        continue;
      if (rule[i].symbol in this.rules)
        continue;
      rule[i] = new Terminal(rule[i].symbol);
    }
    // merge terminals
    for (let i = rule.length - 1; i > 0; i--) {
      if (!(rule[i] instanceof Terminal) || !(rule[i - 1] instanceof Terminal))
        continue;
      rule[i - 1].symbol += rule[i].symbol;
      rule.splice(i, 1);
    }
  }

  clear() {
    this.initGenerator('S');
  }

  checkValid() {
    super.checkValid();
    if (!('S' in this.rules))
      throw new Error("Startsymbol 'S' not found");
  }

  matches(str: string) {
    return super.match(str, 'S');
  }
}

export default FCSGrammar;