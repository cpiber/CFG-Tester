import React, { useState } from 'react';

import styles from './bodyComponent.module.scss';

import Query, { vars } from '../Logic/querys';
import grammar from '../Logic/grammar';
import Textarea from './Textarea';


interface Props {
  className?: string;
}

let timeout = 0;
const TIMEOUT = 400;
function RulesInput(props: Props) {
  let query = Query.useContainer();
  let [status, statusSet] = useState(["",""]);
  let [buttonDisabled, buttonDisable] = useState(false);
  let rules = "";

  const rulesChange = (e: React.ChangeEvent) => {
    rules = (e.target as HTMLInputElement).value;
    query.updateRules(rules);
    buttonDisable(true);
    statusSet(["",""]);

    window.clearTimeout(timeout);
    timeout = window.setTimeout(loadRules, TIMEOUT);
  }

  const clickGenerate = (e: React.MouseEvent) => {
    (e.target as HTMLElement).blur();
    buttonDisable(true);
    loadRules();
  }

  const loadRules = () => {
    buttonDisable(false);
    const error = grammar.loadRules(rules);
    vars.grammarUpdateCB();
    if (error.error) {
      statusSet(["error","Error on line "+error.line]);
    } else {
      statusSet(["ok","Grammar valid"]);
    }
  }

  if (timeout === 0 && query.rules !== "") {
    rules = query.rules;
    timeout = window.setTimeout(loadRules, 1);
  }

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