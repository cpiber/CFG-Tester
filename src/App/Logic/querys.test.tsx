import { cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';
import Query from './querys';

afterEach(cleanup);


const TestComponent = () => {
  let query = Query.useContainer();

  return (
    <React.Fragment>
      <input
        data-testid="hash"
        onChange={(e: React.ChangeEvent) => { // mock hash change event
          query.updateQuery((e.target as HTMLInputElement).value)}} />
      <input
        data-testid="rules"
        onChange={(e: React.ChangeEvent) =>
          query.setRules((e.target as HTMLInputElement).value)}
        value={query.rules}
      />
      <input
        data-testid="input"
        onChange={(e: React.ChangeEvent) =>
          query.setInput((e.target as HTMLInputElement).value)}
        value={query.input}
      />
    </React.Fragment>
  )
}

const renderTest = () => render(
  <Query.Provider><TestComponent /></Query.Provider>
);


test('hash sets rules and input', () => {
  const expectedRules = "rule",
    expectedInput = "input";

  const { getByTestId } = renderTest();
  const hash = "rules=" + expectedRules + "&input=" + expectedInput;
  fireEvent.change(getByTestId('hash'), { target: { value: hash } });

  expect((getByTestId('rules') as HTMLInputElement).value).toBe(expectedRules);
  expect((getByTestId('input') as HTMLInputElement).value).toBe(expectedInput);
});

test('updating state sets hash', done => {
  const expectedRules = "newrule",
    expectedInput = "newinput";

  window.location.hash = "";

  let { getByTestId } = renderTest();

  window.addEventListener('hashchange', () => {
    expect(window.location.hash).toBe(
      "#input=" + expectedInput + "&rules=" + expectedRules
    );
    done();
  });

  fireEvent.change(getByTestId('rules'), { target: { value: expectedRules } });
  fireEvent.change(getByTestId('input'), { target: { value: expectedInput } });
});
