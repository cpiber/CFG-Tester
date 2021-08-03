import React, { useCallback, useEffect, useRef, useState } from 'react';
import Query from '../Logic/providers/querys';
import styles from './bodyComponent.module.scss';
import Textarea from './Textarea';


interface Props {
  className?: string;
}

const TextInput = ({ className }: Props) => {
  const { input, setInput, grammar } = Query.useContainer();
  const [ status, setStatus ] = useState(["", ""]);
  const [ buttonDisabled, setButtonDisabled ] = useState(false);
  const timeout = useRef(0);

  const inputChange = (e: React.ChangeEvent) => {
    setInput((e.target as HTMLInputElement).value);
  }
  
  const clickMatch = (e: React.MouseEvent) => {
    (e.target as HTMLElement).blur();

    match();
  }

  // match input
  const match = useCallback(() => {
    try {
      if (!grammar)
        throw new Error('No grammar object available');
      grammar.checkValid();
      const res = grammar.matches(input);
      setButtonDisabled(false);
      setStatus([res ? 'ok' : 'error', `Input ${res ? 'matches' : 'doesn\'t match'}`]);
    } catch (err) {
      setButtonDisabled(true);
      setStatus(["error", `${err}`]);
    }
  }, [input, grammar]);

  // debounce matching, on grammar or input change
  useEffect(() => {
    timeout.current = window.setTimeout(match, 100);
    return () => window.clearTimeout(timeout.current);
  }, [match]);

  return (
    <div
      className={`${className || ''} status-${status[0]} App-bodyComponent`}
      data-testid="text-input"
    >
      <Textarea
        className={styles.textarea}
        value={input}
        onChange={inputChange}
        title="Test Input"
        aria="Input to match with grammar"
      >
        <div className="row1">
          <span className="status" role="status">
            {status[1]}
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
};
export default TextInput;