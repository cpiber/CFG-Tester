import React from 'react';
import stylesH from './Header.module.scss';
import styles from './Modal.module.scss';

interface Props {
  className?: string;
  close: () => void;
}

const Modal = ({ className, close }: Props) => {
  return (
    <div className={`${className || ''} ${stylesH.cols} App-header`}>
      <h2 className={stylesH.title}>
        Settings
      </h2>
      <div className={`${stylesH.close} ${styles.close}`} onClick={close}>
        &times;
      </div>
    </div>
  )
};
export default Modal;