import queryString from 'query-string';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createContainer } from 'unstated-next';
import { Grammar } from './sharedgrammar';

const useQuery = (initialQuery = "") => {
  const parse = (query: string) => {
    const parsed = queryString.parse(query);
    const nr = typeof(parsed.rules) === "string" ? parsed.rules : "" as string;
    const ni = typeof(parsed.input) === "string" ? parsed.input : "" as string;
    return { rules: nr, input: ni };
  };

  const [state, setState] = useState(parse(initialQuery));
  const [grammar, setGrammar] = useState(undefined as Grammar | undefined);

  const setRules = useCallback((nr: string) => setState({ ...state, rules: nr }), [state, setState]);
  const setInput = useCallback((ni: string) => setState({ ...state, input: ni }), [state, setState]);
  const updateQuery = useCallback((query: string) => setState(parse(query)), [setState]);

  // detect hash changes, cleanup listener on unmount
  useEffect(() => {
    const update = () => updateQuery(window.location.hash);
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, [updateQuery]);
  
  // reflect changes in hash, debounce
  const timeout = useRef(0);
  useEffect(() => {
    timeout.current = window.setTimeout(() => window.location.hash = queryString.stringify(state), 100);
    return () => window.clearTimeout(timeout.current);
  }, [state]);

  return { ...state, setRules, setInput, grammar, setGrammar, updateQuery };
};

const Query = createContainer(useQuery);
export default Query;