import React from 'react';
import { RadioButton } from '../../Radio';
import stylesCode from './code.module.scss';

const n = stylesCode.nonterminal;
const t = stylesCode.terminal;

const FCS = () => {
  return (
    <div>
      <label data-tip="A common style I could not find a name for"><RadioButton value="fcs" className={stylesCode.box} /><span>FCS</span></label>
      <code className={stylesCode.code}>
        <span className={`${stylesCode.entry} ${n}`}>S</span> -&gt; <span className={n}>T</span><span className={t}>b</span> | <span className={t}>a</span><br />
        <span className={n}>T</span> → <span className={t}>1</span><br />
        <span className={n}>T</span> → <span className={t}>2</span>
      </code>
    </div>
  )
};
export default FCS;