import React, { useCallback, useEffect, useRef, useState } from 'react';

import styles from './GrammarOutput.module.scss';
import stylesBody from './bodyComponent.module.scss';
import textarea from './textarea.module.scss';

import Query from '../Logic/querys';
import grammar from '../Logic/grammar';


interface Props {
  className?: string;
  initialStrings?: string[];
}

const NUM_KEY = 'cfg_gen_number';
const GrammarOutput = (props: Props) => {
  const query = Query.useContainer();
  const [stringEls, setStringEls] = useState([] as JSX.Element[]);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const n = +(window.localStorage.getItem(NUM_KEY) || 15);
  const [number, setNumber] = useState(n >= 1 ? n : 1);
  const [status, setStatus] = useState(["",""]);
  const stringGen = useRef(undefined as Generator | undefined);

  const updateGenerator = useCallback(() => {
    let gen = grammar.expandGenerator();
    if (gen.error) {
      console.error(gen);
      setStatus(["error", "Error: "+gen.msg]);
      return;
    }
    setStatus(["",""]);
    stringGen.current = gen.gen;
  }, []);

  const clickGenerate = (e: React.MouseEvent) => {
    if (!e.target) return;
    let target = e.target as HTMLElement;
    
    if (target.tagName === "INPUT") return;
    target.blur();

    if (!stringGen.current) return;

    setButtonDisabled(true);

    let newstrings = [] as string[];
    for (let i = 0; i < number; i++) {
      let str = stringGen.current.next();
      if (str.done) break;
      newstrings.push(str.value as string);
    }
    updateStrings(newstrings);

    if (newstrings.length < number) {
      setStatus(["info", "Grammmar exhausted"]);
      return;
    }
    setButtonDisabled(false);
  };

  const clickClear = (e: React.MouseEvent) => {
    if (!e.target) return;
    (e.target as HTMLElement).blur();

    resetStrings();
    updateGenerator();
  };

  const updateNum = (e: React.ChangeEvent) => {
    let val = +(e.target as HTMLInputElement).value;
    setNumber(val >= 1 ? val : 1);
    window.localStorage.setItem(NUM_KEY, val.toString());
  };

  const updateStrings = (newstrings: string[]) => {
    let strings = newstrings.map((str, ind) => (
      <li key={`${str}${ind+stringEls.length}`} className="monospace">
        {str.toString().split(/\r\n|\r|\n|\\n/g).map((val, key) => (
          <span key={key}>{val}</span>
        ))}
      </li>
    ));
    setStringEls([...stringEls, ...strings]);
  };

  const resetStrings = () => {
    setStringEls([]);
  };

  const grammarUpdated = useCallback(() => {
    resetStrings();
    updateGenerator();
    setButtonDisabled(false);
  }, [updateGenerator]);

  useEffect(() => grammarUpdated(), [query.rules, grammarUpdated]);

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