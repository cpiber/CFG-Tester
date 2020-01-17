import React, { useState } from 'react';

import styles from './bodyComponent.module.scss';

import Query from '../Logic/querys.ts';
import Textarea from './textarea';

function TextInput(props) {
  let query = Query.useContainer();
  let [buttonDisabled, buttonDisable] = useState(false);

  function clickMatch(e) {
    e.target.blur();
  }

  return (
    <div className={`${props.className} App-bodyComponent`}>
      <Textarea
        className={styles.textarea}
        value={query.input}
        onChange={e => query.updateInput(e.target.value)}
        title="Test Input"
        aria="Input to match with grammar"
      >
        <button
          className="button secondary"
          onClick={clickMatch}
          disabled={buttonDisabled}
        >
          Re-Match
        </button>
      </Textarea>
    </div>
  )
}
export default TextInput;