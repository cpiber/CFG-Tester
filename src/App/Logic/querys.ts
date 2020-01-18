import queryString from 'query-string';
import { useState } from 'react';
import { createContainer } from 'unstated-next';


interface AnyObject {
  [key: string]: string
}

let isInit = false;
const query: AnyObject = {};

const useQuery = () => {
  let [rules, setRules] = useState("");
  let [input, setInput] = useState("");

  const updateQuery = () => {
    let parsed = queryString.parse(window.location.hash);

    query.rules =
      typeof(parsed.rules) === "string" ? parsed.rules : "" as string;
    setRules(query.rules);

    query.input =
      typeof(parsed.input) === "string" ? parsed.input : "" as string;
    setInput(query.input);
  }

  // Add event handlers exactly once
  if (!isInit) {
    window.addEventListener('hashchange', updateQuery, false);
    //window.addEventListener('load', updateQuery, false);
    updateQuery();
    isInit = true;
  }

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
const Query = createContainer(useQuery);

export default Query;