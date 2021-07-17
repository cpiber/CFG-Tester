import { act, cleanup, fireEvent, render, wait } from '@testing-library/react';
import React from 'react';
import Query from './querys';


const TestComponent = () => {
  const { rules, setRules, input, setInput } = Query.useContainer();

  return (
    <React.Fragment>
      <input
        data-testid="rules"
        onChange={(e: React.ChangeEvent) =>
          setRules((e.target as HTMLInputElement).value)}
        value={rules}
      />
      <input
        data-testid="input"
        onChange={(e: React.ChangeEvent) =>
          setInput((e.target as HTMLInputElement).value)}
        value={input}
      />
    </React.Fragment>
  )
}

const renderTest = (query = "") => render(
  <Query.Provider initialState={query}><TestComponent /></Query.Provider>
);

const listenerMap: { [key: string]: EventListener[] } = {};
beforeEach(() => {
  Object.keys(listenerMap).forEach(k => delete listenerMap[k]); // clear
  window.addEventListener = jest.fn((ev: string, cb: EventListenerOrEventListenerObject) => {
    if (!(ev in listenerMap))
      listenerMap[ev] = [];
    listenerMap[ev].push(((cb as EventListenerObject).handleEvent || (cb as EventListener)));
  });
});

afterEach(cleanup);

test('hash sets rules and input', async () => {
  const expectedRules = "rule",
    expectedInput = "input";
  
  const { getByTestId } = renderTest();
  const hash = "rules=" + expectedRules + "&input=" + expectedInput;
  window.location.hash = hash;
  expect((window.addEventListener as jest.Mock).mock.calls.length).toBeGreaterThanOrEqual(1);

  act(() => {
    listenerMap['hashchange'].forEach(cb => cb(new HashChangeEvent('hashchange')));
  });

  await wait(() => expect((getByTestId('rules') as HTMLInputElement).value).toBe(expectedRules));
  await wait(() => expect((getByTestId('input') as HTMLInputElement).value).toBe(expectedInput));
});

test('updating state sets hash', async () => {
  const expectedRules = "newrule",
    expectedInput = "newinput";

  window.location.hash = "";
  let { getByTestId } = renderTest();

  fireEvent.change(getByTestId('rules'), { target: { value: expectedRules } });
  fireEvent.change(getByTestId('input'), { target: { value: expectedInput } });

  await wait(() =>
    expect(window.location.hash).toBe(
      "#input=" + expectedInput + "&rules=" + expectedRules
    )
  );
});

test('rules and input are set initially', async () => {
  const expectedRules = "rule",
    expectedInput = "input";
  
  const hash = "rules=" + expectedRules + "&input=" + expectedInput;
  const { getByTestId } = renderTest(hash);

  await wait(() => expect((getByTestId('rules') as HTMLInputElement).value).toBe(expectedRules));
  await wait(() => expect((getByTestId('input') as HTMLInputElement).value).toBe(expectedInput));
});
