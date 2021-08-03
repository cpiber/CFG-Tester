import React, { HTMLProps } from 'react';
import { RadioButton } from '../../Radio';
import stylesCode from './code.module.scss';

interface SProps extends HTMLProps<HTMLSpanElement> {
  value: string;
}

const E = ({ value: val, ...args }: SProps) => <span {...args}>&lt;<span className={stylesCode.entry}>{val}</span>&gt;</span>;
const N = ({ value: val, ...args }: SProps) => <span {...args}>&lt;<span className={stylesCode.nonterminal}>{val}</span>&gt;</span>;
const T = ({ value: val, ...args }: SProps) => <span {...args}>"<span className={stylesCode.terminal}>{val}</span>"</span>;

const BNF = () => {
  return (
    <div>
      <label data-tip="Backus-Naur form"><RadioButton value="bnf" className={stylesCode.box} /><span>BNF</span></label>
      <code className={stylesCode.code}>
        <E value='start' /> ::= <N value='int' /> <T value='B' /> | <T value='a' /> | <T value="" data-tip="At least one symbol is required" /><br />
        <N value='int' /> ::= <T value='1' /><br />
        <N value='int' /> ::= <T value='2' />
      </code>
    </div>
  )
};
export default BNF;