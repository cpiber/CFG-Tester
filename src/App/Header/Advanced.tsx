import React, { useState, Fragment } from 'react';
import { EXP_DEPTH, EXP_ITER, EXP_NONTERM, readMaxDepth, readMaxIter, readMaxNonTerms, writeMaxDepth, writeMaxIter, writeMaxNonTerms } from '../values';
import styles from './Advanced.module.scss';

interface Props {
  className?: string;
  open: boolean;
  setOpen: (n: boolean) => void;
}

const Advanced = ({ className, open, setOpen }: Props) => {
  const c = `${styles.wrapper} ${open ? styles.open : styles.close}`;
  return (
    <div className={`${className || ''} ${c}`}>
      <h3 className={styles.opener} onClick={() => setOpen(!open)} data-testid="opener">
        Advanced
      </h3>
      <div className={styles.content} data-testid="content">
        <p className={styles.warn}>Note: These values were chosen carefully, changing them could cause problems.</p>
        <p><label>Max recursion depth: <Value read={readMaxDepth} write={writeMaxDepth} name={EXP_DEPTH} /></label>
           <label>Max non-terminals in a row: <Value read={readMaxNonTerms} write={writeMaxNonTerms} name={EXP_NONTERM} /></label>
           <label>Max iterations per call: <Value read={readMaxIter} write={writeMaxIter} name={EXP_ITER} /></label></p>
      </div>
    </div>
  )
};

interface VProps {
  read: () => number;
  write: (n: number) => number;
  name: string;
}

const Value = ({ read, write, name }: VProps) => {
  const [ num, setNum ] = useState(read());
  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNum(write(+e.target.value));
  };
  const clear = () => {
    window.localStorage.removeItem(name);
    setNum(read());
  };

  return (
    <Fragment>
      <input type="number" value={num} onChange={change} size={5} className={styles.value} name={name} />
      <span onClick={clear} className={styles.clear} title="Clear value">&#x1f5d1;</span>
    </Fragment>
  );
};
export default Advanced;