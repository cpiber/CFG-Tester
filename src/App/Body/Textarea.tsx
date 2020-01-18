import React from 'react';
import uniqueString from 'unique-string';

import styles from './textarea.module.scss';


interface Props {
  className?: string;
  title?: string;
  placeholder?: string;
  onChange?: ((event: React.ChangeEvent<HTMLTextAreaElement>) => void);
  value?: string;
  aria?: string;
  children?: JSX.Element[] | JSX.Element;
}

function Textarea(props: Props) {
  let id = uniqueString();
  return (
    <div className={`${styles.area} ${props.className?props.className:''}`}>
      {props.title && (
        <h2 className={styles.title}>
          <label htmlFor={id}>{props.title}</label>
        </h2>
      )}
      <textarea
        id={id}
        className="textarea monospace"
        onChange={props.onChange}
        draggable="false"
        placeholder={props.placeholder?props.placeholder:"Enter text here..."}
        value={props.value}
        aria-label={props.aria}
      ></textarea>
      {props.children && (
        <div className="children">
          {props.children}
        </div>
      )}
    </div>
  )
}
export default Textarea;