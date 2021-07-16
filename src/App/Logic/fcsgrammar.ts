import { branchMatch, EmptySymbol, escapeMatch, Grammar, NonTerminal, Rule, Terminal } from "./sharedgrammar";

const ruleMatchFCS = /^\s*([A-Z])\s*(?:->|→)\s*(.*)$/;
const nonTerminalMatchFCS = /(\\*)([A-Z])/g;

class FCSGrammar extends Grammar {
  constructor(rules: string) {
    super();
    const lines = rules.split(/\r\n|\r|\n/g);
    this.parseRules(lines);

    // check for non-terminals in rules
    for (const sym in this.rules) {
      this.parseNonTerminals(this.rules[sym]);
    }
  }

  private parseRules(lines: string[]) {
    const regexp = ruleMatchFCS;
    // parse rules into arrays
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.trim() === "") continue; // ignore empty lines

      const match = line.match(regexp);

      if (!match)
        throw new Error(`Syntax error on line ${i + 1}: ${this.lineToError(line)}`);

      let newbranches: Terminal[] = [],
        bmatch: RegExpExecArray | null,
        lastIndex = 0;
      while ((bmatch = branchMatch.exec(match[2])) !== null) {
        // even number of backslashes means they are not
        // escaping the |
        if (bmatch[1].length % 2 === 0) {
          let before = match[2].substring(lastIndex, bmatch.index + bmatch[1].length);
          newbranches.push(this.branchToTerminal(before.trim()));
          lastIndex = branchMatch.lastIndex;
        }
      }
      const after = match[2].substring(lastIndex);
      newbranches.push(this.branchToTerminal(after.trim()));
      const rules = newbranches.map(t => [t]);

      if (match[1] in this.rules) {
        this.rules[match[1]].push(...rules);
      } else {
        this.rules[match[1]] = rules;
      }
    }
  }

  private parseNonTerminals(rules: Rule[]) {
    for (let j = 0; j < rules.length; j++) {
      const branch = rules[j][0].symbol, // currently only 1 terminal symbol, split that
        regexp = nonTerminalMatchFCS;
      let match: RegExpExecArray | null,
        newbranch: Rule = [],
        lastIndex = 0;

      while ((match = regexp.exec(branch)) !== null) {
        // even number of backslashes means they are not
        // escaping the non-terminal
        if (match[1].length % 2 === 0 && match[2] in this.rules) {
          const before = branch.substring(lastIndex, match.index);
          if (before !== "") newbranch.push(this.branchToTerminal(before, true));
          newbranch.push(new NonTerminal(match[2]));
          lastIndex = regexp.lastIndex;
        }
      }
      const after = branch.substring(lastIndex).trim();
      if (after !== "") newbranch.push(this.branchToTerminal(after, true));

      if (!newbranch.length) newbranch.push(new EmptySymbol());

      rules[j] = newbranch;
    }
  }

  private branchToTerminal(string: string, unescape = false) {
    return (
      string === "^" || string === "ε" || string === "" ?
        new EmptySymbol() :
        new Terminal(unescape ? string.replace(escapeMatch, "$1$2") : string)
    );
  }

  private lineToError(line: string) {
    if (line.indexOf("->") === -1 && line.indexOf("→") === -1)
      return "Rule indicator '->' missing";
    return "Non-terminal symbols must be single capital letters";
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