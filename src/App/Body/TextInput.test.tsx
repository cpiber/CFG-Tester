import { act, cleanup, fireEvent, render } from '@testing-library/react';
import { stringify } from 'query-string';
import React, { useEffect } from 'react';
import { Grammar } from '../Logic/grammar';
import { NonFunctionalGrammar, TestGrammar as FunctionalGrammar } from '../Logic/grammar.test';
import { Terminal } from '../Logic/grammartypes';
import Query from '../Logic/querys';
import TextInput from './TextInput';

type C = (i: string) => void;

interface Props { effect?: C, grammar?: Grammar }
const TestComponent = ({ effect, grammar }: Props) => {
  const { input, setGrammar } = Query.useContainer();

  useEffect(() => {
    setGrammar(grammar);
  }, []);

  useEffect(() => {
    if (effect) effect(input);
  }, [input]);

  return <React.Fragment />;
}

const renderTest = (cb?: C, input = '', gramar?: Grammar) => render(
  <Query.Provider initialState={stringify({ input })}><TextInput /><TestComponent effect={cb} grammar={gramar} /></Query.Provider>
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
  const text = 'initial';
  const { getByRole } = renderTest(mock, text);
  act(jest.runAllTimers);
  expect(getByRole('textbox')).toHaveTextContent(text);
});

test('input field updates query', () => {
  const text = 'input';
  const { getByRole } = renderTest(mock);

  mock.mockImplementationOnce((input: string) => input);
  fireEvent.change(getByRole('textbox'), { target: { value: text } });
  act(jest.runAllTimers);
  expect(mock).toHaveReturnedWith(text);
});

test('setting input tries to match and sets status', () => {
  const { getByRole, getByTestId } = renderTest(mock, '', new FunctionalGrammar({ Start: [[new Terminal('text')]] }));

  fireEvent.change(getByRole('textbox'), { target: { value: 'text' } });
  act(jest.runAllTimers);
  expect(getByRole('status')).toHaveTextContent('Input matches');
  expect(getByTestId('text-input')).toHaveClass('status-ok');

  fireEvent.change(getByRole('textbox'), { target: { value: 'tex' } });
  act(jest.runAllTimers);
  expect(getByRole('status')).toHaveTextContent('Input doesn\'t match');
  expect(getByTestId('text-input')).toHaveClass('status-error');
});

test('grammar with no start symbol sets text correctly', () => {
  const { getByRole, getByTestId } = renderTest(mock, '', new FunctionalGrammar({ }));
  act(jest.runAllTimers);
  expect(getByRole('status')).toHaveTextContent("Startsymbol 'Start' not found");
  expect(getByTestId('text-input')).toHaveClass('status-error');
});

test('no grammar yet', () => {
  const { getByRole, getByTestId } = renderTest(mock);
  act(jest.runAllTimers);
  expect(getByRole('status')).toHaveTextContent('Error: No grammar object available');
  expect(getByTestId('text-input')).toHaveClass('status-error');
});

test('clicking match tries again', () => {
  const { getByRole } = renderTest(mock, 'input', new NonFunctionalGrammar(mock));
  act(jest.runAllTimers);

  expect(getByRole('status')).toHaveTextContent('Input matches');
  mock.mockImplementationOnce(() => { throw new Error('success'); });
  fireEvent.click(getByRole('button'));
  expect(getByRole('status')).toHaveTextContent('Error: success');
});
