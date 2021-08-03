import { extendedClamp } from './Logic/util';

const EXP_DEPTH = 'cfg_maxdepth'; // to prevent infinite recursion
const EXP_NONTERM = 'cfg_maxnonterm'; // maximum non-terminals in a row
const EXP_ITER = 'cfg_iter'; // maximum iterations between yields per call
const NUM_KEY = 'cfg_gen_number';

type toNumArgsRest = (typeof extendedClamp) extends (str: string, ...args: infer R) => number ? R : never;
const readNum = (name: string, _: number, ...args: toNumArgsRest) => extendedClamp(window.localStorage.getItem(name) || '', ...args);
const writeNum = (name: string, val: number, ...args: toNumArgsRest) => {
  const v = extendedClamp(val, ...args);
  window.localStorage.setItem(name, '' + v);
  return v;
};
type Op = typeof readNum & typeof writeNum;

const maxDepth = (operation: Op, val: number) => operation(EXP_DEPTH, val, 20);
const maxNonTerms = (operation: Op, val: number) => operation(EXP_NONTERM, val, 10);
const maxIter = (operation: Op, val: number) => operation(EXP_ITER, val, 5000);
const genNum = (operation: Op, val: number) => operation(NUM_KEY, val, 15, 1, 999);

export const readMaxDepth = maxDepth.bind(null, readNum, 0);
export const writeMaxDepth = maxDepth.bind(null, writeNum);
export const readMaxNonTerms = maxNonTerms.bind(null, readNum, 0);
export const writeMaxNonTerms = maxNonTerms.bind(null, writeNum);
export const readMaxIter = maxIter.bind(null, readNum, 0);
export const writeMaxIter = maxIter.bind(null, writeNum);
export const readGenNum = genNum.bind(null, readNum, 0);
export const writeGenNum = genNum.bind(null, writeNum);