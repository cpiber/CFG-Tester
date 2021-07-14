import React, { useEffect, useState, useMemo } from 'react';

import styles from './GrammarOutput.module.scss';
import stylesBody from './bodyComponent.module.scss';
import textarea from './textarea.module.scss';

import Query from '../Logic/querys';


interface Props {
  className?: string;
  initialStrings?: string[];
}

const NUM_KEY = 'cfg_gen_number';
const GrammarOutput = (props: Props) => {
  const { grammar } = Query.useContainer();
  const [strings, setStrings] = useState([] as string[]);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const n = +(window.localStorage.getItem(NUM_KEY) || 15);
  const [number, setNumber] = useState(n >= 1 ? n : 1);
  const [status, setStatus] = useState(["",""]);

  const clickGenerate = (e: React.MouseEvent) => {
    if (!e.target) return;
    const target = e.target as HTMLElement;
    
    if (target.tagName === "INPUT") return;
    target.blur();

    if (!grammar) return;

    setButtonDisabled(true);

    const newstrings = [] as string[];
    for (let i = 0; i < number; i++) {
      const str = grammar.next();
      if (str === undefined)
        break;
      newstrings.push(str);
    }
    setStrings([...strings, ...newstrings]);

    if (newstrings.length < number) {
      setStatus(["info", "Grammmar exhausted"]);
      return;
    }
    setButtonDisabled(false);
  };

  const clickClear = (e: React.MouseEvent) => {
    if (!e.target) return;
    (e.target as HTMLElement).blur();

    grammarUpdated();
  };

  const updateNum = (e: React.ChangeEvent) => {
    const val = +(e.target as HTMLInputElement).value;
    setNumber(val >= 1 ? val : 1);
    window.localStorage.setItem(NUM_KEY, val.toString());
  };

  const resetStrings = () => setStrings([]);
  const grammarUpdated = () => {
    resetStrings();

    try {
      grammar?.checkExpandable();
      grammar?.clear();
      setButtonDisabled(false);
      setStatus(["", ""]);
    } catch (err) {
      setButtonDisabled(true);
      setStatus(["error", `${err}`]);
    }
  };
  useEffect(grammarUpdated, [grammar]);

  const stringEls = useMemo(() => strings.map((str, ind) => (
    <li key={ind} className="monospace">
      {str.toString().split(/\r\n|\r|\n|\\n/g).map((val, key) => (
        <span key={key}>{val}</span>
      ))}
    </li>
  )), [strings]);
  
  return (
    <div
      className={`${props.className?props.className:''} status-${status[0]} App-bodyComponent`}
    >
      <div className={`${textarea.area} ${stylesBody.textarea}`}>
        <h2 className={textarea.title}>Strings</h2>
        <div className={styles.strings}>
          <ul>
            {stringEls}
          </ul>
        </div>
        <div className="children">
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
              aria-label="Get more strings"
            >
              Get <input
                type="number"
                className="input secondary_alt"
                size={4}
                value={number}
                onChange={updateNum}
                aria-label="Number of strings to get"
                /> more
            </button>
            <button
              className="button secondary"
              onClick={clickClear}
              aria-label="Clear strings"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default GrammarOutput;