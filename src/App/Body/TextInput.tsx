import React, { useState } from 'react';

import styles from './bodyComponent.module.scss';

import Query from '../Logic/querys';
import Textarea from './Textarea';


interface Props {
  className?: string;
}

function TextInput(props: Props) {
  let query = Query.useContainer();
  let [buttonDisabled, buttonDisable] = useState(false);

  const inputChange = (e: React.ChangeEvent) =>
    query.updateInput((e.target as HTMLInputElement).value);
  
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