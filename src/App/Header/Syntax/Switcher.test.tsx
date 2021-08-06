import { cleanup, fireEvent, render } from '@testing-library/react';
import React, { useEffect } from 'react';
import Syntax from '../../Logic/providers/syntaxes';
import SyntaxSwitcher from './Switcher';

interface Props { cb?: (s: string) => void; syn?: string; }
const TestComponent = ({ cb, syn }: Props) => {
  const { syntax, setSyntax } = Syntax.useContainer();

  useEffect(() => {
    if (syn) setSyntax(syn);
  }, []);

  useEffect(() => {
    if (cb) cb(syntax);
  }, [syntax]);

  return <React.Fragment />;
}

const renderTest = (props?: Props) => render(
  <Syntax.Provider><TestComponent {...props} /><SyntaxSwitcher /></Syntax.Provider>
);

afterEach(cleanup);
afterEach(() => {
  window.localStorage.clear();
});

test('has content', () => {
  const { container } = renderTest();
  expect(container).toHaveTextContent('Select syntax');
  expect(container).toHaveTextContent('FCS');
  expect(container).toHaveTextContent('BNF');
  expect(container.querySelector('[value="fcs"]')).not.toBeNull();
  expect(container.querySelector('[value="bnf"]')).not.toBeNull();
});

test('correct radio is checked', () => {
  const { container } = renderTest({ syn: 'bnf' });
  expect(container.querySelector('[value="bnf"]')).toBeChecked();
});

test('clicking radio sets syntax', () => {
  const cb = jest.fn();
  const { container } = renderTest({ cb });
  expect(cb).toHaveBeenCalledWith('fcs');
  fireEvent.click(container.querySelector('[value="bnf"]')!);
  expect(cb).toHaveBeenCalledWith('bnf');
});