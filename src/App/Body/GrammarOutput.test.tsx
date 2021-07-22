import { cleanup, fireEvent, render } from '@testing-library/react';
import React, { useEffect } from 'react';
import type { Grammar } from '../Logic/grammar';
import { NonFunctionalGrammar, TestGrammar } from '../Logic/grammar.test';
import { EmptySymbol, NonTerminal, Terminal } from '../Logic/grammartypes';
import Query from './../Logic/querys';
import GrammarOutput from './GrammarOutput';

interface Props { grammar?: Grammar }
const TestComponent = ({ grammar }: Props) => {
  const { setGrammar } = Query.useContainer();

  useEffect(() => {
    setGrammar(grammar);
  }, []);

  return <React.Fragment />;
}

function* range(start: number, end?: number) {
  for (let i = start; end === undefined || i < end; i++)
    yield i;
}

const renderTest = (grammar?: Grammar) => render(
  <Query.Provider><GrammarOutput /><TestComponent grammar={grammar} /></Query.Provider>
);

afterEach(cleanup);

test('outputs and displays exhausted', () => {
  const { getByRole, getByTestId } = renderTest(new TestGrammar({ Start: [[new Terminal('text')]] }));
  expect(getByTestId('strings').children).toHaveLength(0);
  fireEvent.click(getByTestId('generate'));
  expect(getByTestId('strings').children).toHaveLength(1);
  expect(getByTestId('strings')).toHaveTextContent('text');
  expect(getByTestId('output')).toHaveClass('status-info');
  expect(getByRole('status')).toHaveTextContent('Grammar exhausted');
});

test('number of strings restricted by input', () => {
  const g = new TestGrammar({ Start: [...range(0, 20)].map(v => [new Terminal(`${v}`)]) });
  const { getByTestId } = renderTest(g);
  expect(getByTestId('strings').children).toHaveLength(0);

  let num = 10;
  fireEvent.change(getByTestId('number'), { target: { value: num } });
  fireEvent.click(getByTestId('generate'));
  expect(getByTestId('strings').children).toHaveLength(num);
  Array.from(getByTestId('strings').children).forEach((v, i) => {
    expect(v).toHaveTextContent(`${i}`);
  });
  let n = num;

  num = 5;
  fireEvent.change(getByTestId('number'), { target: { value: num } });
  fireEvent.click(getByTestId('generate'));
  expect(getByTestId('strings').children).toHaveLength(n + num);
  Array.from(getByTestId('strings').children).forEach((v, i) => {
    expect(v).toHaveTextContent(`${i}`);
  });

  n += num;
  fireEvent.click(getByTestId('generate'));
  expect(getByTestId('strings').children).toHaveLength(n + num);
  Array.from(getByTestId('strings').children).forEach((v, i) => {
    expect(v).toHaveTextContent(`${i}`);
  });

  // exhausted
  n += num;
  expect(n).toBeGreaterThanOrEqual(g["rules"].Start.length);
  fireEvent.click(getByTestId('generate'));
  expect(getByTestId('strings').children).toHaveLength(n);
});

test('number of strings restricted by input, iteration safe', () => {
  const { getByRole, getByTestId } = renderTest(new TestGrammar({ Start: [[new NonTerminal('Start'), new NonTerminal('Start')], [new Terminal('text')]] }));
  expect(getByTestId('strings').children).toHaveLength(0);

  const num = 15;
  fireEvent.change(getByTestId('number'), { target: { value: num } });
  fireEvent.click(getByTestId('generate'));
  try {
    expect(getByTestId('strings').children).toHaveLength(num);
  } catch {
    expect(getByRole('status')).toHaveTextContent(/without finding a new value/);
  }
  const n = getByTestId('number').childElementCount;
  fireEvent.click(getByTestId('generate'));
  try {
    expect(getByTestId('strings').children).toHaveLength(n + num);
  } catch {
    expect(getByRole('status')).toHaveTextContent(/without finding a new value/);
  }
});

test('clear button resets', () => {
  const { getByTestId } = renderTest(new TestGrammar({ Start: [...range(0, 20)].map(v => [new Terminal(`${v}`)]) }));
  expect(getByTestId('strings').children).toHaveLength(0);

  const num = 10;
  fireEvent.change(getByTestId('number'), { target: { value: num } });

  fireEvent.click(getByTestId('generate'));
  expect(getByTestId('strings').children).toHaveLength(num);
  const text = Array.from(getByTestId('strings').children).map(e => e.textContent!);

  fireEvent.click(getByTestId('clear'));
  expect(getByTestId('strings').children).toHaveLength(0);

  fireEvent.click(getByTestId('generate'));
  expect(getByTestId('strings').children).toHaveLength(num);
  Array.from(getByTestId('strings').children).forEach((e, i) => {
    expect(e).toHaveTextContent(text[i]);
  });
});

test('clicking number input does not cause generate', () => {
  const { getByTestId } = renderTest(new TestGrammar({ Start: [...range(0, 20)].map(v => [new Terminal(`${v}`)]) }));
  expect(getByTestId('strings').children).toHaveLength(0);
  fireEvent.click(getByTestId('number'));
  expect(getByTestId('strings').children).toHaveLength(0);
});

test('empty strings are displayed correctly', () => {
  const { getByTestId } = renderTest(new TestGrammar({ Start: [[new EmptySymbol()]] }));
  fireEvent.click(getByTestId('generate'));
  expect(getByTestId('strings').children).toHaveLength(1);
  expect(getByTestId('strings')).toHaveTextContent('ε');
});

test('grammar with no start symbol sets text correctly', () => {
  const { getByRole, getByTestId } = renderTest(new TestGrammar({ }));
  fireEvent.click(getByTestId('generate'));
  expect(getByRole('status')).toHaveTextContent("Startsymbol 'Start' not found");
  expect(getByTestId('output')).toHaveClass('status-error');
});

test('no grammar yet', () => {
  const { getByTestId } = renderTest();
  fireEvent.click(getByTestId('generate'));
  expect(getByTestId('output')).toHaveClass('status-');
});

test('clear resets error', () => {
  const mock = jest.fn();
  mock.mockImplementationOnce(() => { throw new Error('test'); });
  const { getByRole, getByTestId } = renderTest(new NonFunctionalGrammar(mock));
  fireEvent.click(getByTestId('generate'));
  expect(getByRole('status')).toHaveTextContent("Error: test");
  expect(getByTestId('output')).toHaveClass('status-error');

  fireEvent.click(getByTestId('clear'));
  expect(getByRole('status')).toHaveTextContent('');
  expect(getByTestId('output')).toHaveClass('status-');
});