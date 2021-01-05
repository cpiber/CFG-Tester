import React, { useCallback, useEffect, useState } from 'react';

import styles from './bodyComponent.module.scss';

import Query from '../Logic/querys';
import grammar from '../Logic/grammar';
import Textarea from './Textarea';


interface Props {
  className?: string;
}

const RulesInput = (props: Props) => {
  let query = Query.useContainer();
  let [status, setStatus] = useState(["",""]);
  let [buttonDisabled, setButtonDisabled] = useState(false);

  const rulesChange = (e: React.ChangeEvent) => {
    const rules = (e.target as HTMLInputElement).value;
    query.setRules(rules);
  }

  const clickGenerate = (e: React.MouseEvent) => {
    (e.target as HTMLElement).blur();
    setButtonDisabled(true);
    loadRules();
    const rules = query.rules;
    query.setRules(rules+" ");
    query.setRules(rules);
    setButtonDisabled(false);
  }

  const loadRules = useCallback(() => {
    const error = grammar.loadRules(query.rules);
    if (error.error) {
      setStatus(["error","Error on line "+error.line]);
    } else {
      setStatus(["ok","Grammar valid"]);
    }
  }, [query.rules]);

  useEffect(() => {
    setButtonDisabled(true);
    setStatus(["", ""]);
    loadRules();
    setButtonDisabled(false);
  }, [query.rules, loadRules]);

  return (
    <div
      className={`${props.className?props.className:''} status-${status[0]} App-bodyComponent`}
    >
      <Textarea
        className={styles.textarea}
        value={query.rules}
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
            disabled={buttonDisabled}
          >
            Regenerate Model
          </button>
        </div>
      </Textarea>
    </div>
  )
}
export default RulesInput;