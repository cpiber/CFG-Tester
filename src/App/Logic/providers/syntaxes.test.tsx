import { cleanup, fireEvent, render } from '@testing-library/react';
import React, { useEffect } from 'react';
import type { Grammar } from '../grammar';
import BNFGrammar from '../grammar/bnfgrammar';
import FCSGrammar from '../grammar/fcsgrammar';
import Syntax from './syntaxes';

interface Props { cb?: (s: string, g: Grammar) => void; rules?: string; }
const TestComponent = ({ cb, rules }: Props) => {
  const { syntax, setSyntax, createGrammar } = Syntax.useContainer();
  if (!rules) rules = '';

  useEffect(() => {
    if (cb) cb(syntax, createGrammar(rules!));
  }, [syntax]);

  return (
    <input
      data-testid="syntax"
      onChange={(e: React.ChangeEvent) =>
        setSyntax((e.target as HTMLInputElement).value)}
      value={syntax}
    />
  )
}

const renderTest = (props?: Props) => render(
  <Syntax.Provider><TestComponent {...props} /></Syntax.Provider>
);

afterEach(cleanup);
afterEach(() => {
  window.localStorage.clear();
});

test('saves syntax with verification', () => {
  const { getByTestId } = renderTest();
  const s = getByTestId('syntax');
  expect(s).toHaveValue('fcs'); // default
  fireEvent.change(s, { target: { value: 'bnf' } });
  expect(s).toHaveValue('bnf');
  fireEvent.change(s, { target: { value: 'invalid' } }); // back to default
  expect(s).toHaveValue('fcs');
});

test('creates correct grammar', () => {
  const cb = jest.fn();
  const { getByTestId } = renderTest({ cb });
  expect(cb).toHaveBeenCalledWith('fcs', expect.any(FCSGrammar));
  fireEvent.change(getByTestId('syntax'), { target: { value: 'bnf' } });
  expect(cb).toHaveBeenCalledWith('bnf', expect.any(BNFGrammar));
});