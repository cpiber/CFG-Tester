import React, { useState } from 'react';

import styles from './bodyComponent.module.scss';

import Query from '../Logic/querys';
import Textarea from './Textarea';


interface Props {
  className?: string;
}

let timeout = -1;
const TIMEOUT = 400;
function RulesInput(props: Props) {
  let query = Query.useContainer();
  let [status, statusSet] = useState(["ok",""]);
  let [buttonDisabled, buttonDisable] = useState(false);

  const rulesChange = (e: React.ChangeEvent) => {
    query.updateRules((e.target as HTMLInputElement).value);
    buttonDisable(true);
    statusSet(["ok",""]);

    window.clearTimeout(timeout);
    timeout = window.setTimeout(loadRules, TIMEOUT);
  }

  const clickGenerate = (e: React.MouseEvent) => {
    (e.target as HTMLElement).blur();
    buttonDisable(true);
    loadRules();
  }

  const loadRules = () => {
    console.log('load');
    buttonDisable(false);
    statusSet(["error","Error in Grammar"]);
  }

  if (timeout === -1) {
    loadRules();
    timeout = 0;
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
          <span className="status">
            {status[1]}
          </span>
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