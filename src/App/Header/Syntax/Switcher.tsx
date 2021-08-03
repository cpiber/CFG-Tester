import React from 'react';
import Syntax from '../../Logic/providers/syntaxes';
import { RadioGroup } from '../../Radio';
import BNF from './BNF';
import FCS from './FCS';
import stylesCode from './code.module.scss';

interface Props {
  className?: string;
}
const SyntaxSwitcher = ({ className }: Props) => {
  const { syntax, setSyntax } = Syntax.useContainer();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSyntax(e.target.value);
  };
  
  return (
    <div className={`${className || ''}`}>
      Select syntax:
      <RadioGroup onChange={onChange} value={syntax}>
        <FCS />
        <BNF />
      </RadioGroup>

      Both syntaxes above produce the same grammar, with different names for <span className={stylesCode.entry}>Start</span>-, <span className={stylesCode.nonterminal}>non-terminal</span> and <span className={stylesCode.terminal}>terminal</span> symbols.
    </div>
  )
};
export default SyntaxSwitcher;