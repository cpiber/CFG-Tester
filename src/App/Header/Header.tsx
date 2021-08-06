import React, { useState } from 'react';
import ReactModal from 'react-modal';
import ReactTooltip from 'react-tooltip';
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
      data-testid="header"
    >
      <h1 className={styles.title}>
        <abbr title="Context-free grammar">CFG</abbr> Testing suite
      </h1>
      <div className={styles.settings}>
        <Cog onClick={() => setOpen(true)} data-testid="cog" />
      </div>

      <ReactModal
        isOpen={isOpen}
        onRequestClose={close}
        onAfterOpen={() => ReactTooltip.rebuild()}
        testId="modal"
      >
        <Modal close={close} />
      </ReactModal>
    </header>
  );
};
export default Header;