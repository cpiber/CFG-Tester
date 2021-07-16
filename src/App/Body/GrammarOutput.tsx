import React, { useEffect, useMemo, useState } from 'react';
import Query from '../Logic/querys';
import type { Grammar } from '../Logic/sharedgrammar';
import { clamp } from '../Logic/util';
import stylesBody from './bodyComponent.module.scss';
import styles from './GrammarOutput.module.scss';
import textarea from './textarea.module.scss';


interface Props {
  className?: string;
  initialStrings?: string[];
}

const NUM_KEY = 'cfg_gen_number';
const n_min = 1;
const n_max = 999;
const n = clamp(+(window.localStorage.getItem(NUM_KEY) || 15), n_min, n_max);

const checkClick = (e: React.MouseEvent, grammar: Grammar | undefined): grammar is Grammar => {
  if (!e.target) return false;
  const target = e.target as HTMLElement;
  
  if (target.tagName === "INPUT") return false;
  target.blur();

  if (!grammar) return false;

  return true;
};

const GrammarOutput = (props: Props) => {
  const { grammar } = Query.useContainer();
  const [ strings, setStrings ] = useState(new Set<string>());
  const [ buttonDisabled, setButtonDisabled ] = useState(false);
  const [ number, setNumber ] = useState(n);
  const [ status, setStatus ] = useState(["",""]);

  const clickGenerate = (e: React.MouseEvent) => {
    if (!checkClick(e, grammar))
      return;

    setButtonDisabled(true);
    setStatus(["", ""]);

    let hasWarn = false;
    let i;
    for (i = 0; i < number; i++) {
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
    setStrings(new Set(strings));

    if (i < number && !hasWarn) {
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
    const val = clamp(+(e.target as HTMLInputElement).value, n_min, n_max);
    setNumber(val);
    window.localStorage.setItem(NUM_KEY, val.toString());
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
  useEffect(grammarUpdated, [grammar]);

  const stringEls = useMemo(() => [...strings.values()].map((str, ind) => (
    <li key={ind} className="monospace">
      {str.toString().split(/\r\n|\r|\n|\\n/g).map((val, key) => (
        <span key={key}>{val}</span>
      ))}
    </li>
  )), [strings]);
  
  return (
    <div
      className={`${props.className || ''} status-${status[0]} App-bodyComponent`}
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
                size={3}
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