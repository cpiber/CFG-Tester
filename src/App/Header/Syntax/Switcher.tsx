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
      <h3>Select syntax</h3>

      <RadioGroup onChange={onChange} value={syntax}>
        <FCS />
        <BNF />
      </RadioGroup>

      <p>Both syntaxes above produce the same grammar, with different names and conventions for <span className={stylesCode.entry} data-tip="The entry symbol into the grammar">Start</span>-, <span className={stylesCode.nonterminal}>non-terminal</span> and <span className={stylesCode.terminal}>terminal</span> symbols.</p>
      <p>BNF is stricter and does not allow empty branches or implicit symbol declarations.</p>
    </div>
  )
};
export default SyntaxSwitcher;