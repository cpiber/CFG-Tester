import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { createContainer } from 'unstated-next';

const useQuery = () => {
  let [rules, setRules] = useState("");
  let [input, setInput] = useState("");

  const updateQuery = (query: string) => {
    let parsed = queryString.parse(query);

    setRules(typeof(parsed.rules) === "string" ? parsed.rules : "" as string);
    setInput(typeof(parsed.input) === "string" ? parsed.input : "" as string);
  }

  useEffect(() => {
    window.location.hash = queryString.stringify({ rules, input })
  }, [rules, input]);

  return { rules, setRules, input, setInput, updateQuery }
}

const Query = createContainer(useQuery);
export default Query;