import { act, cleanup, fireEvent, render } from '@testing-library/react';
import { stringify } from 'query-string';
import React, { useEffect } from 'react';
import { Grammar, Terminal } from '../Logic/grammar';
import Syntax from '../Logic/providers/syntaxes';
import Query from './../Logic/providers/querys';
import RulesInput from './RulesInput';

type C = (g: Grammar | undefined) => void;

interface Props { effect?: C }
const TestComponent = ({ effect }: Props) => {
  const { grammar } = Query.useContainer();

  useEffect(() => {
    if (effect) effect(grammar);
  }, [grammar]);

  return <React.Fragment />;
}

const renderTest = (cb?: C, rules = "") => render(
  <Syntax.Provider><Query.Provider initialState={stringify({ rules })}><RulesInput /><TestComponent effect={cb} /></Query.Provider></Syntax.Provider>
);

let mock: jest.Mock;
beforeEach(() => {
  mock = jest.fn();
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

afterEach(cleanup);

test('initial query is displayed', () => {
  const text = 'initial rules';
  const { getByRole } = renderTest(mock, text);
  act(jest.runAllTimers);
  expect(getByRole('textbox')).toHaveTextContent(text);
});

test('input generates grammar and sets status', async () => {
  const { getByTestId, getByRole } = renderTest(mock);

  mock.mockImplementationOnce((grammar: Grammar) => grammar["rules"]);
  fireEvent.change(getByRole('textbox'), { target: { value: 'S -> 1' }});
  act(jest.runAllTimers);
  expect(mock).toHaveReturnedWith({
    S: [[new Terminal('1')]],
  });

  expect(getByRole('status')).toHaveTextContent('');
  expect(getByTestId('rules-input')).toHaveClass('status-ok');

  fireEvent.change(getByRole('textbox'), { target: { value: ' -> 1' }});
  act(jest.runAllTimers);
  expect(getByTestId('rules-input')).toHaveClass('status-error');
  expect(getByRole('status')).toHaveTextContent(`Error: Unexpected '-', expected Non-Terminal at line 1, column 2`);
});

test('button creates new object', async () => {
  const { getByRole } = renderTest(mock);

  fireEvent.change(getByRole('textbox'), { target: { value: 'S -> 1' }});
  act(jest.runAllTimers);
  const calls = mock.mock.calls.length;
  fireEvent.click(getByRole('button'));
  act(jest.runAllTimers);
  expect(mock).not.toHaveBeenCalledTimes(calls);
});