import queryString from 'query-string';
import { useState } from 'react';
import { createContainer } from 'unstated-next';

function useQuery() {
  let parsed = queryString.parse(window.location.hash);

  let [rules, setRules] = useState(parsed.rules);
  let [input, setInput] = useState(parsed.input);

  function updateRules(r: string) {
    parsed.rules = r;
    setRules(r);
    updateQueryString();
  }
  function updateInput(i: string) {
    parsed.input = i;
    setInput(i);
    updateQueryString();
  }

  function updateQueryString() {
    window.location.hash = queryString.stringify(parsed);
  }

  return { rules, updateRules, input, updateInput }
}

let Query = createContainer(useQuery);

export default Query;