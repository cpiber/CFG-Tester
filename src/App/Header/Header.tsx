import React from 'react';
import styles from './Header.module.scss';
import { ReactComponent as Cog } from './settings.svg';


interface Props {
  className?: string;
}

const Header = ({ className }: Props) => {
  return (
    <header
      className={`${className || ''} ${styles.cols} App-header`}
    >
      <h1 className={styles.title}>
        <abbr title="Context-free grammar">CFG</abbr> Testing suite
      </h1>
      <div className={styles.settings}>
        <Cog />
      </div>
    </header>
  );
};
export default Header;