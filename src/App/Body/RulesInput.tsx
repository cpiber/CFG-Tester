import React, { useState } from 'react';

import styles from './bodyComponent.module.scss';

import Query from '../Logic/querys';
import Textarea from './Textarea';


interface Props {
  className?: string;
}

function RulesInput(props: Props) {
  let query = Query.useContainer();
  let [buttonDisabled, buttonDisable] = useState(false);

  const rulesChange = (e: React.ChangeEvent) =>
    query.updateRules((e.target as HTMLInputElement).value);

  const clickGenerate = (e: React.MouseEvent) => {
    (e.target as HTMLElement).blur();
  }

  return (
    <div
      className={`${props.className?props.className:''} App-bodyComponent`}
    >
      <Textarea
        className={styles.textarea}
        value={query.rules}
        onChange={rulesChange}
        title="Rules"
        aria="Rules that describe the grammar"
      >
        <button
          className="button secondary"
          onClick={clickGenerate}
          disabled={buttonDisabled}
        >
          Regenerate Model
        </button>
      </Textarea>
    </div>
  )
}
export default RulesInput;