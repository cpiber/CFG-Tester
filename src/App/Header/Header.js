import React from 'react';

function Header(props) {
  return (
    <header className={`${props.className?props.className:''} App-header`}>
      <h1><abbr title="Context-free grammar">CFG</abbr> Testing suite</h1>
    </header>
  );
}

export default Header;