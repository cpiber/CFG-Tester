
const ruleMatchFCS = /^\s*([A-Z])\s*(?:->|→)\s*(.*)$/;
const nonTerminalMatchFCS = /(\\*)([A-Z])/g;

const branchMatch = /(\\*)\|/g;
const escapeMatch = /(\\(?:n|r|t|f))|\\(.)/g;

export const EXP_DEPTH = 'cfg_maxdepth'; // too prevent infinite recursion
class Grammar {
  rules = [] as ((string|number)[]|string)[][];
  dict = {} as { [key:string]: number };
  maxDepth = +(window.localStorage.getItem(EXP_DEPTH) || 15);

  loadRules(rules: string): { error: boolean, line?: number } {
    this.rules = [];
    const lines = rules.split(/\r\n|\r|\n/g);
    this.dict = {};

    const regexp = ruleMatchFCS;

    // parse rules into arrays
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.trim() === "") continue; // ignore empty lines
      
      const match = line.match(regexp);

      if (!match) {
        const error = { error: true, line: i+1 };
        console.log(error);
        return error;
      }

      let newbranches = [] as string[],
        bmatch,
        lastIndex = 0;
      while ((bmatch = branchMatch.exec(match[2])) !== null) {
        // even number of backslashes means they are not
        // escaping the |
        if (bmatch[1].length % 2 === 0) {
          let before = match[2].substring(lastIndex, bmatch.index + bmatch[1].length);
          newbranches.push(this.branchString(before));
          lastIndex = branchMatch.lastIndex;
        }
      }
      const after = match[2].substring(lastIndex);
      newbranches.push(this.branchString(after));

      // each non-terminal receives an id (index)
      // save ids via hashtable
      let index: number;
      if (match[1] in this.dict) {
        index = this.dict[match[1]];
        this.rules[index] = this.rules[index].concat(newbranches);
      } else {
        index = this.rules.length;
        this.dict[match[1]] = index;
        this.rules.push(newbranches);
      }
    }

    // check for non-terminals in rules
    for (let i = 0; i < this.rules.length; i++) {
      const rule = this.rules[i];
      for (let j = 0; j < rule.length; j++) {
        const branch = rule[j] as string,
          regexp = nonTerminalMatchFCS;
        let match,
          newbranch = [],
          lastIndex = 0;

        while ((match = regexp.exec(branch)) !== null) {
          // even number of backslashes means they are not
          // escaping the non-terminal
          if (match[1].length % 2 === 0 && match[2] in this.dict) {
            const before = branch.substring(lastIndex, match.index);
            if (before !== "") newbranch.push(before);
            newbranch.push(this.dict[match[2]]);
            lastIndex = regexp.lastIndex;
          }
        }
        const after = branch.substring(lastIndex);
        if (after !== "") newbranch.push(after);

        if (!newbranch.length) newbranch.push("");

        rule[j] = newbranch;
      }
    }

    return { error: false };
  }

  branchString(string: string) {
    return (
      string === "^" || string === "ε" || string.trim() === "" ?
      "" : // symbols for empty
      string.replace(escapeMatch, "$1$2") // unescape
    );
  }

  expandGenerator(startsym = 'S') {
    let grammar = this;
    function* expand(
      start: string|number,
      rules: (string|number)[],
      string: string,
      depth: number,
      lastSym: string|number
    ): Generator {
      if (depth > grammar.maxDepth) {
        console.debug('max depth');
        return;
      }
      // non-terminal
      if (typeof(start) === "number" && start in grammar.rules) {
        const rule = grammar.rules[start];
        for (let j = 0; j < rule.length; j++) {
          const branch = rule[j] as (string|number)[];
          
          if (start === lastSym) continue;

          // prepend the branch's rules to the remaining ones
          // TODO: see tree diagram
          yield* expand(
            branch[0],
            [
              ...branch.slice(1),
              ...rules
            ],
            string,
            // set depth depending on next symbol (branch=same depth)
            depth + (typeof(branch[0]) === "number" ? 0 : 1),
            start
          );
        }
      } else {
        if (rules.length) {
          // add terminal symbol to end of string and go on
          yield* expand(
            rules[0],
            rules.slice(1),
            string + start,
            depth,
            start
          );
        } else {
          // leaf node - offer complete string
          yield string + start;
        }
      }
    }

    const start = (startsym in this.dict ? this.dict[startsym] : -1);
    if (start === -1) {
      return { error: true, msg: "Symbol not found" };
    }
    return { error: false, gen: expand(start, [], "", 0, -1) };
  }
}
const grammar = new Grammar();
(window as {[key:string]:any}).grammar = grammar;

export default grammar;