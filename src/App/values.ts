import { EClampVal, extendedClamp } from './Logic/util';

export const EXP_DEPTH = 'cfg_maxdepth'; // to prevent infinite recursion
export const EXP_NONTERM = 'cfg_maxnonterm'; // maximum non-terminals in a row
export const EXP_ITER = 'cfg_iter'; // maximum iterations between yields per call
export const NUM_KEY = 'cfg_gen_number';
export const SYN_KEY = 'cfg_syntax_name';

type toNumArgsRest = (typeof extendedClamp) extends (str: string, ...args: infer R) => number ? R : never;
const readNum = (name: string, _: EClampVal, ...args: toNumArgsRest) => extendedClamp(window.localStorage.getItem(name), ...args);
const writeNum = (name: string, val: EClampVal, ...args: toNumArgsRest) => {
  const v = extendedClamp(val, ...args);
  window.localStorage.setItem(name, '' + v);
  return v;
};
type Op = typeof readNum & typeof writeNum;

const maxDepth = (operation: Op, val: EClampVal) => operation(EXP_DEPTH, val, 20);
const maxNonTerms = (operation: Op, val: EClampVal) => operation(EXP_NONTERM, val, 10);
const maxIter = (operation: Op, val: EClampVal) => operation(EXP_ITER, val, 5000);
const genNum = (operation: Op, val: EClampVal) => operation(NUM_KEY, val, 15, 1, 999);

export const readMaxDepth = maxDepth.bind(null, readNum, null);
export const writeMaxDepth = maxDepth.bind(null, writeNum);
export const readMaxNonTerms = maxNonTerms.bind(null, readNum, null);
export const writeMaxNonTerms = maxNonTerms.bind(null, writeNum);
export const readMaxIter = maxIter.bind(null, readNum, null);
export const writeMaxIter = maxIter.bind(null, writeNum);
export const readGenNum = genNum.bind(null, readNum, null);
export const writeGenNum = genNum.bind(null, writeNum);


export type GrammarSyntax = 'fcs' | 'bnf';
const validateSyntax = (val: string | null): GrammarSyntax => val === 'fcs' || val === 'bnf' ? val : 'fcs';
export const readSyntax = () => validateSyntax(window.localStorage.getItem(SYN_KEY));
export const writeSyntax = (val: string) => {
  const syn = validateSyntax(val);
  window.localStorage.setItem(SYN_KEY, syn);
  return syn;
};