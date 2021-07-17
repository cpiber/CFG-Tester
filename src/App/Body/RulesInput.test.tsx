import { cleanup, fireEvent, render, wait } from '@testing-library/react';
import React, { useEffect } from 'react';
import type { Grammar } from '../Logic/grammar';
import { Terminal } from '../Logic/grammartypes';
import Query from './../Logic/querys';
import RulesInput from './RulesInput';

type C = (g: Grammar | undefined) => void;

interface Props { effect: C }
const TestComponent = ({ effect }: Props) => {
  const { grammar } = Query.useContainer();

  useEffect(() => {
    effect(grammar);
  }, [grammar]);

  return <React.Fragment />;
}

const renderTest = (cb: C) => render(
  <Query.Provider><RulesInput /><TestComponent effect={cb} /></Query.Provider>
);

afterEach(cleanup);

let mock: jest.Mock;
const g = () => mock.mock.calls[mock.mock.calls.length-1][0] as Grammar;
beforeEach(() => {
  mock = jest.fn();
});

test('input generates grammar and sets status', async () => {
  mock(undefined);
  const { getByTestId, getByRole } = renderTest(mock);

  fireEvent.change(getByRole('textbox'), { target: { value: 'S -> 1' }});
  await wait(() => {
    const gr = g();
    expect(gr).not.toBe(undefined);
    expect(gr["rules"]).toEqual({
      S: [[new Terminal('1')]],
    });
  });
  expect(getByRole('status')).toHaveTextContent('');
  expect(getByTestId('rules-input')).toHaveClass('status-ok');

  fireEvent.change(getByRole('textbox'), { target: { value: ' -> 1' }});
  await wait(() => {
    expect(getByTestId('rules-input')).toHaveClass('status-error');
  });
  expect(getByRole('status')).toHaveTextContent(`Error: Unexpected '-', expected Non-Terminal at line 1, column 2`);
});

test('button creates new object', async () => {
  mock(undefined);
  const { getByRole } = renderTest(mock);

  fireEvent.change(getByRole('textbox'), { target: { value: 'S -> 1' }});
  await wait(() => {
    expect(g()).not.toBe(undefined);
  });
  const calls = mock.mock.calls.length;
  fireEvent.click(getByRole('button'));
  await wait(() => {
    expect(mock.mock.calls.length).not.toBe(calls);
  });
});