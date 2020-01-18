import queryString from 'query-string';
import { useState } from 'react';
import { createContainer } from 'unstated-next';


interface AppWindow extends Window {
  cfg?: any;
}

interface AnyObject {
  [key: string]: string
}

function useQuery() {
  let [query] = useState<AnyObject>({});
  let [rules, setRules] = useState("");
  let [input, setInput] = useState("");

  const updateHash = () => {
    let parsed = queryString.parse(window.location.hash);

    query.rules =
      typeof(parsed.rules) === "string" ? parsed.rules : "" as string;
    setRules(query.rules);

    query.input =
      typeof(parsed.input) === "string" ? parsed.input : "" as string;
    setInput(query.input);
  }

  // Add event handlers exactly once
  if (!(window as AppWindow).cfg) (() => {
    window.addEventListener('hashchange', updateHash, false);
    //window.addEventListener('load', updateHash, false);
    updateHash();
    (window as AppWindow).cfg = true;
  })();

  const updateRules = (r: string) => {
    query.rules = r;
    setRules(r);
    updateQueryString();
  }
  const updateInput = (i: string) => {
    query.input = i;
    setInput(i);
    updateQueryString();
  }
  const updateQueryString = () => {
    if (rules !== query.rules || input !== query.input)
      window.location.hash = queryString.stringify(query);
  }

  return { rules, updateRules, input, updateInput }
}

let Query = createContainer(useQuery);

export default Query;