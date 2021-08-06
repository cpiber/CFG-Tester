import React, { useState } from 'react';
import Advanced from './Advanced';
import stylesH from './Header.module.scss';
import styles from './Modal.module.scss';
import SyntaxSwitcher from './Syntax/Switcher';

interface Props {
  className?: string;
  close: () => void;
}

const Modal = ({ className, close }: Props) => {
  const [ advancedOpen, setAdvancedOpen ] = useState(false);

  return (
    <div className={`${className || ''}`}>
      <div className={`${stylesH.cols} App-header`}>
        <h2 className={stylesH.title}>
          Settings
        </h2>
        <div className={`${stylesH.close} ${styles.close}`} onClick={close} data-testid="close">
          &times;
        </div>
      </div>

      <SyntaxSwitcher className={styles.content} />
      <Advanced className={styles.content} open={advancedOpen} setOpen={setAdvancedOpen} />
    </div>
  )
};
export default Modal;