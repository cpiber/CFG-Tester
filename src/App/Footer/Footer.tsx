import React from 'react';
import { author, beginyear, source } from "./data";


interface Props {
  className?: string;
}

const Footer = ({ className }: Props) => {
  const year = (new Date()).getFullYear().toString(),
    divider = " :: ";

  return (
    <footer
      className={`${className || ''} App-footer`}
      data-testid="footer"
    >
      {!beginyear || year === beginyear ? year : `${beginyear}-${year}`}
      {author && ` by ${author}`}
      {source && (
        <React.Fragment>
          <span>{divider}</span>
          <a href={source} target="_blank" rel="noopener noreferrer">Source</a>
        </React.Fragment>
      )}
    </footer>
  );
};
export default Footer;