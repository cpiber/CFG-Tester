import React, { useCallback, useEffect, useState } from 'react';

import styles from './bodyComponent.module.scss';

import Query from '../Logic/querys';
import Textarea from './Textarea';
import FCSGrammar from '../Logic/fcsgrammar';


interface Props {
  className?: string;
}

const RulesInput = (props: Props) => {
  const { rules, setRules, setGrammar } = Query.useContainer();
  const [status, setStatus] = useState(["",""]);
  let timeout = 0;

  const rulesChange = (e: React.ChangeEvent) => {
    setRules((e.target as HTMLInputElement).value);
  };

  const clickGenerate = (e: React.MouseEvent) => {
    (e.target as HTMLElement).blur();
    loadRules();
  };

  const loadRules = useCallback(() => {
    window.clearTimeout(timeout);
    window.setTimeout((r: string) => {
      try {
        setGrammar(new FCSGrammar(r));
        setStatus(["", ""]);
      } catch (err) {
        setStatus(["error",`${err}`]);
      }
    }, 10, rules);
  }, [rules, setGrammar, timeout]);

  useEffect(loadRules, [rules, loadRules]);

  return (
    <div
      className={`${props.className?props.className:''} status-${status[0]} App-bodyComponent`}
    >
      <Textarea
        className={styles.textarea}
        value={rules}
        onChange={rulesChange}
        title="Rules"
        aria="Rules that describe the grammar"
      >
        <div className="row1">
          <div className="status">
            {status[1]}
          </div>
        </div>
        <div className="row2">
          <button
            className="button secondary"
            onClick={clickGenerate}
          >
            Regenerate Model
          </button>
        </div>
      </Textarea>
    </div>
  )
}
export default RulesInput;