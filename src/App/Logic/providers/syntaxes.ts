import { createContainer } from 'unstated-next';
import { useState, useCallback } from 'react';
import { readSyntax, GrammarSyntax, writeSyntax } from '../../values';
import FCSGrammar from '../grammar/fcsgrammar';
import BNFGrammar from '../grammar/bnfgrammar';

const useSyntax = () => {
  const [ syntax, _setSyntax ] = useState(readSyntax());
  const setSyntax = useCallback((val: string) => {
    _setSyntax(writeSyntax(val));
  }, [_setSyntax]);

  const createGrammar = useCallback((rules: string) => createGrammarFromSyntax(syntax, rules), [syntax]);
  
  return { syntax, setSyntax, createGrammar };
};

const Syntax = createContainer(useSyntax);
export default Syntax;

export const createGrammarFromSyntax = (syntax: GrammarSyntax, rules: string) => {
  if (syntax === 'fcs')
    return new FCSGrammar(rules);
  return new BNFGrammar(rules);
};