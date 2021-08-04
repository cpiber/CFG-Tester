import React from 'react';
import stylesH from './Header.module.scss';
import styles from './Modal.module.scss';
import SyntaxSwitcher from './Syntax/Switcher';

interface Props {
  className?: string;
  close: () => void;
}

const Modal = ({ className, close }: Props) => {
  return (
    <div className={`${className || ''}`}>
      <div className={`${stylesH.cols} App-header`}>
        <h2 className={stylesH.title}>
          Settings
        </h2>
        <div className={`${stylesH.close} ${styles.close}`} onClick={close}>
          &times;
        </div>
      </div>

      <SyntaxSwitcher className={styles.content} />
    </div>
  )
};
export default Modal;