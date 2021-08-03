import React, { PropsWithChildren } from 'react';
import uniqueString from 'unique-string';
import styles from './Textarea.module.scss';


interface Props {
  id?: string;
  className?: string;
  title?: string;
  placeholder?: string;
  onChange?: ((event: React.ChangeEvent<HTMLTextAreaElement>) => void);
  value?: string;
  aria?: string;
}

const Textarea = ({ id, className, title, placeholder, onChange, value, aria, children }: PropsWithChildren<Props>) => {
  const id_ = id || uniqueString();
  return (
    <div className={`${styles.area} ${className || ''}`} data-testid="container">
      {title && (
        <h2 className={styles.title}>
          <label
            htmlFor={id_}
            data-testid="label"
          >{title}</label>
        </h2>
      )}
      <textarea
        id={id_}
        className="textarea monospace"
        onChange={onChange}
        draggable="false"
        placeholder={typeof placeholder === "string" ? placeholder : "Enter text here..."}
        value={value}
        aria-label={aria}
      ></textarea>
      {children && (
        <div className="children">
          {children}
        </div>
      )}
    </div>
  )
};
export default Textarea;