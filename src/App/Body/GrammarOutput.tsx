import React, { useEffect, useMemo, useState } from 'react';
import type { Grammar } from '../Logic/grammar';
import Query from '../Logic/providers/querys';
import { setMap } from '../Logic/set';
import { readGenNum, writeGenNum } from '../values';
import stylesBody from './bodyComponent.module.scss';
import styles from './GrammarOutput.module.scss';
import textarea from './Textarea.module.scss';


interface Props {
  className?: string;
}

const GrammarOutput = ({ className }: Props) => {
  const [ strings, setStrings ] = useState(new Set<string>());
  const [ status, setStatus ] = useState(["",""]);

  const stringEls = useMemo(() => setMap(strings, (str, ind) => (
    <li key={ind} className="monospace">
      {str.split(/\r\n|\r|\n|\\n/g).map((val, key) => (
        <span key={key} className={val === '' ? styles.empty : ''}>{val || 'ε'}</span>
      ))}
    </li>
  )), [strings]);
  
  return (
    <div
      className={`${className || ''} status-${status[0]} App-bodyComponent`}
      data-testid="output"
    >
      <div className={`${textarea.area} ${stylesBody.textarea}`}>
        <h2 className={textarea.title}>Strings</h2>
        <div className={styles.strings}>
          <ul data-testid="strings">
            {stringEls}
          </ul>
        </div>
        <div className="children">
          <div className="row1">
            <span className="status" role="status">
              {status[1]}
            </span>
          </div>
          <Inputs strings={strings} setStrings={setStrings} setStatus={setStatus} />
        </div>
      </div>
    </div>
  )
};

interface InputProps {
  strings: Set<string>;
  setStrings: (n: Set<string>) => void;
  setStatus: (n: string[]) => void;
}

const checkClick = (e: React.MouseEvent, grammar: Grammar | undefined): grammar is Grammar => {
  const target = e.target as HTMLElement;
  
  if (target.tagName === "INPUT") return false;
  target.blur();

  if (!grammar) return false;
  return true;
};

const getStrings = (grammar: Grammar, strings: Set<string>, number: number, setStatus: InputProps['setStatus']) => {
  let hasWarn = false;
  let i;
  const startSize = strings.size;
  for (i = 0; i < number; i = strings.size - startSize) {
    const str = grammar.next();
    if (str === undefined)
      break;
    if (str instanceof Error) {
      hasWarn = true;
      setStatus(["warn", str.message]);
      break;
    }
    strings.add(str);
  }
  return { i, hasWarn };
}

const Inputs = ({ strings, setStrings, setStatus }: InputProps) => {
  const { grammar } = Query.useContainer();
  const [ buttonDisabled, setButtonDisabled ] = useState(false);
  const [ isClear, setClear ] = useState(false);
  const [ number, setNumber ] = useState(readGenNum());

  const clickGenerate = (e: React.MouseEvent) => {
    if (!checkClick(e, grammar))
      return;

    setButtonDisabled(true);
    setStatus(["", ""]);

    const { i, hasWarn } = getStrings(grammar, strings, number, setStatus);
    setStrings(new Set(strings));

    if (i < number && !hasWarn) {
      setStatus(["info", "Grammar exhausted"]);
      return;
    }
    setButtonDisabled(false);
  };

  const clickClear = (e: React.MouseEvent) => {
    (e.target as HTMLElement).blur();
    grammarUpdated();
  };

  const updateNum = (e: React.ChangeEvent) => {
    const val = (e.target as HTMLInputElement).value;
    if (val.trim() === '')
      return setClear(true);
    setNumber(writeGenNum(val));
    setClear(false);
  };

  const grammarUpdated = () => {
    setStrings(new Set());

    try {
      grammar?.checkValid();
      grammar?.clear();
      setButtonDisabled(false);
      setStatus(["", ""]);
    } catch (err) {
      setButtonDisabled(true);
      setStatus(["error", `${err}`]);
    }
  };
  useEffect(grammarUpdated, [grammar, setStatus, setStrings]);

  return (
    <div className="row2">
      <button
        className="button secondary"
        onClick={clickGenerate}
        disabled={buttonDisabled}
        aria-label="Get more strings"
        data-testid="generate"
      >
        Get <input
          type="number"
          className="input secondary_alt"
          size={3}
          value={isClear ? '' : number}
          onChange={updateNum}
          aria-label="Number of strings to get"
          data-testid="number"
          /> more
      </button>
      <button
        className="button secondary"
        onClick={clickClear}
        aria-label="Clear strings"
        data-testid="clear"
      >
        Clear
      </button>
    </div>
  )
}
export default GrammarOutput;