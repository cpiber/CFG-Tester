import React, { useState } from 'react';
import ReactModal from 'react-modal';
import styles from './Header.module.scss';
import Modal from './Modal';
import { ReactComponent as Cog } from './settings.svg';


interface Props {
  className?: string;
}

const Header = ({ className }: Props) => {
  const [ isOpen, setOpen ] = useState(false);

  const close = () => setOpen(false);

  return (
    <header
      className={`${className || ''} ${styles.cols} App-header`}
    >
      <h1 className={styles.title}>
        <abbr title="Context-free grammar">CFG</abbr> Testing suite
      </h1>
      <div className={styles.settings}>
        <Cog onClick={() => setOpen(true)} />
      </div>

      <ReactModal
        isOpen={isOpen}
        onRequestClose={close}
      >
        <Modal close={close} />
      </ReactModal>
    </header>
  );
};
export default Header;