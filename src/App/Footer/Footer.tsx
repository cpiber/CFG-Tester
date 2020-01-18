import React from 'react';


interface Props {
  className?: string;
}

function Footer(props: Props) {
  const year = (new Date()).getFullYear().toString(),
    beginyear = process.env.REACT_APP_BEGIN_YEAR,
    author = process.env.REACT_APP_AUTHOR,
    source = process.env.REACT_APP_GITHUB_URL,
    divider = " :: ";

  return (
    <footer
      className={`${props.className?props.className:''} App-footer`}
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
}
export default Footer;