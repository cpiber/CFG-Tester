import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { createContainer } from 'unstated-next';
import { Grammar } from './sharedgrammar';

const useQuery = () => {
  const [rules, setRules] = useState("");
  const [input, setInput] = useState("");
  const [grammar, setGrammar] = useState(undefined as Grammar | undefined);

  const updateQuery = (query: string) => {
    const parsed = queryString.parse(query);
    
    setRules(typeof(parsed.rules) === "string" ? parsed.rules : "" as string);
    setInput(typeof(parsed.input) === "string" ? parsed.input : "" as string);
  };

  useEffect(() => {
    window.location.hash = queryString.stringify({ rules, input })
  }, [rules, input]);

  return { rules, setRules, input, setInput, grammar, setGrammar, updateQuery };
};

const Query = createContainer(useQuery);
export default Query;