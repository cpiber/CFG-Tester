import React, { useCallback, useEffect, useRef, useState } from 'react';
import FCSGrammar from '../Logic/fcsgrammar';
import Query from '../Logic/querys';
import styles from './bodyComponent.module.scss';
import Textarea from './Textarea';


interface Props {
  className?: string;
}

const RulesInput = (props: Props) => {
  const { rules, setRules, setGrammar } = Query.useContainer();
  const [status, setStatus] = useState(["",""]);
  const timeout = useRef(0);

  const rulesChange = (e: React.ChangeEvent) => {
    setRules((e.target as HTMLInputElement).value);
  };

  const clickGenerate = (e: React.MouseEvent) => {
    (e.target as HTMLElement).blur();
    loadRules();
  };

  // parse rules, debounced
  const loadRules = useCallback(() => {
    timeout.current = window.setTimeout(() => {
      try {
        setGrammar(new FCSGrammar(rules));
        setStatus(["ok", ""]);
      } catch (err) {
        setStatus(["error",`${err}`]);
      }
      console.log(rules);
    }, 50);
    return () => window.clearTimeout(timeout.current);
  }, [rules, setGrammar]);

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