import React, { useCallback, useEffect, useRef, useState } from 'react';
import Query from '../Logic/providers/querys';
import Syntax from '../Logic/providers/syntaxes';
import styles from './bodyComponent.module.scss';
import Textarea from './Textarea';

const placeholders = {
  fcs: ['S -> 1 | 2 | 3', 'S -> 4 | 5 | 6'],
  bnf: ['<start> ::= "1" | "2" | "3"', '<start> ::= "4" | "5" | "6"'],
};

interface Props {
  className?: string;
}

const RulesInput = ({ className }: Props) => {
  const { rules, setRules, setGrammar } = Query.useContainer();
  const { syntax, createGrammar } = Syntax.useContainer();
  const [ status, setStatus ] = useState(["",""]);
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
        setGrammar(createGrammar(rules));
        setStatus(["ok", ""]);
      } catch (err) {
        setStatus(["error",`${err}`]);
      }
    }, 50);
    return () => window.clearTimeout(timeout.current);
  }, [rules, setGrammar, createGrammar]);

  useEffect(loadRules, [rules, loadRules]);

  return (
    <div
      className={`${className || ''} status-${status[0]} App-bodyComponent`}
      data-testid="rules-input"
    >
      <Textarea
        className={styles.textarea}
        value={rules}
        onChange={rulesChange}
        title="Rules"
        aria="Rules that describe the grammar"
        placeholder={`Enter rules here... e.g.\n${placeholders[syntax].join('\n')}`}
      >
        <div className="row1">
          <div className="status" role="status">
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
};
export default RulesInput;