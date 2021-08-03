import React, { HTMLProps } from 'react';
import { RadioButton } from '../../Radio';
import stylesCode from './code.module.scss';

interface SProps extends HTMLProps<HTMLSpanElement> {
  value: string;
}

const E = ({ value: val, ...args }: SProps) => <span className={stylesCode.entry} {...args}>{val}</span>;
const N = ({ value: val, ...args }: SProps) => <span className={stylesCode.nonterminal} {...args}>{val}</span>;
const T = ({ value: val, ...args }: SProps) => <span className={stylesCode.terminal} {...args}>{val}</span>;

const FCS = () => {
  return (
    <div>
      <label><RadioButton value="fcs" className={stylesCode.box} /><span>FCS</span></label>
      <code className={stylesCode.code}>
        <E value='S' /> -&gt; <N value='T' /><T value='B' data-tip="Unresolved non-terminals get converted to terminals" /> | <T value='a' /> | <T value="&nbsp;" data-tip="Empty branches work implicitly" /><br />
        <N value='T' /> → <T value='1' /><br />
        <N value='T' /> → <T value='2' />
      </code>
    </div>
  )
};
export default FCS;