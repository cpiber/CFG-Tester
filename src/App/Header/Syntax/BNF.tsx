import React from 'react';
import { RadioButton } from '../../Radio';
import styles from './BNF.module.scss';
import stylesCode from './code.module.scss';

const e = `${stylesCode.entry} ${styles.entry}`;
const n = `${stylesCode.nonterminal} ${styles.nonterminal}`;
const t = `${stylesCode.terminal} ${styles.terminal}`;

const BNF = () => {
  return (
    <div>
      <label data-tip="Backus-Naur form"><RadioButton value="bnf" className={stylesCode.box} /><span>BNF</span></label>
      <code className={stylesCode.code}>
        <span className={e}>start</span> ::= <span className={n}>int</span> <span className={t}>b</span> | <span className={t}>a</span><br />
        <span className={n}>int</span> ::= <span className={t}>1</span><br />
        <span className={n}>int</span> ::= <span className={t}>2</span>
      </code>
    </div>
  )
};
export default BNF;