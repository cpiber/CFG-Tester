import React, { useState } from 'react';

import styles from './bodyComponent.module.scss';

import Query from '../Logic/querys';
import Textarea from './Textarea';


interface Props {
  className?: string;
}

const TextInput = (props: Props) => {
  let query = Query.useContainer();
  let [status, /*setStatus*/] = useState("Matching is not implemented yet");
  let [buttonDisabled, /*setButtonDisabled*/] = useState(false);

  const inputChange = (e: React.ChangeEvent) =>
    query.setInput((e.target as HTMLInputElement).value);
  
  const clickMatch = (e: React.MouseEvent) => {
    (e.target as HTMLElement).blur();
  }

  return (
    <div
      className={`${props.className?props.className:''} App-bodyComponent`}
    >
      <Textarea
        className={styles.textarea}
        value={query.input}
        onChange={inputChange}
        title="Test Input"
        aria="Input to match with grammar"
      >
        <div className="row1">
          <span className="status">
            {status}
          </span>
        </div>
        <div className="row2">
          <button
            className="button secondary"
            onClick={clickMatch}
            disabled={buttonDisabled}
          >
            Re-Match
          </button>
        </div>
      </Textarea>
    </div>
  )
}
export default TextInput;