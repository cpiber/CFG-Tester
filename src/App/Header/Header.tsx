import React from 'react';


interface Props {
  className?: string;
}

const Header = ({ className }: Props) => {
  return (
    <header
      className={`${className || ''} App-header`}
    >
      <h1>
        <abbr title="Context-free grammar">CFG</abbr> Testing suite
      </h1>
    </header>
  );
};
export default Header;