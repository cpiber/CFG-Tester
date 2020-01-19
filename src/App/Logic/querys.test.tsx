import React, { useEffect } from 'react';
import Query from './querys';
import { render, act, fireEvent, waitForDomChange } from '@testing-library/react'


const TestComponent = () => {
  let query = Query.useContainer();

  return (
    <React.Fragment>
      <input
        data-testid="rules"
        onChange={(e: React.ChangeEvent) =>
          query.updateRules((e.target as HTMLInputElement).value)}
        value={query.rules}
      />
      <input
        data-testid="input"
        onChange={(e: React.ChangeEvent) =>
          query.updateInput((e.target as HTMLInputElement).value)}
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
  act(() => {
    window.location.hash = "rules="+expectedRules+"&input="+expectedInput;
  });

  return waitForDomChange().then(() => {
    expect((getByTestId('rules') as HTMLInputElement).value).toBe(expectedRules);
    expect((getByTestId('input') as HTMLInputElement).value).toBe(expectedInput);
  }).catch(err => console.error(`Error: ${err}`));
});

test('updating state sets hash', done => {
  const expectedRules = "newrule",
    expectedInput = "newinput";

  act(() => {
    window.location.hash = "";
  });

  let { getByTestId } = renderTest();

  window.addEventListener('hashchange', () => {
    expect(window.location.hash).toBe(
      "#input="+expectedInput+"&rules="+expectedRules
    );
    done();
  });

  act(() => {
    fireEvent.change(getByTestId('rules'), { target: {value: expectedRules} });
    fireEvent.change(getByTestId('input'), { target: {value: expectedInput} });
  });
});
