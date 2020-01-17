import React, { useState } from 'react';

import styles from './bodyComponent.module.scss';

import Query from '../Logic/querys.ts';
import Textarea from './textarea';

function RulesInput(props) {
  let query = Query.useContainer();
  let [buttonDisabled, buttonDisable] = useState(false);

  function clickGenerate(e) {
    e.target.blur();
  }

  return (
    <div className={`${props.className} App-bodyComponent`}>
      <Textarea
        className={styles.textarea}
        value={query.rules}
        onChange={e => query.updateRules(e.target.value)}
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