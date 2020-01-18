import React from 'react';


interface Props {
  className?: string;
}

function Header(props: Props) {
  return (
    <header
      className={`${props.className?props.className:''} App-header`}
    >
      <h1>
        <abbr title="Context-free grammar">CFG</abbr> Testing suite
      </h1>
    </header>
  );
}

export default Header;