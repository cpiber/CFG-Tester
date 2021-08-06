import { cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { EXP_DEPTH, EXP_ITER, EXP_NONTERM, readMaxDepth, readMaxIter, readMaxNonTerms } from '../values';
import Advanced from './Advanced';

afterEach(cleanup);
afterEach(() => {
  window.localStorage.clear();
});

test('has inputs for all three number inputs', () => {
  const { container } = render(<Advanced open={false} setOpen={jest.fn()} />);
  expect(container.querySelector(`[name="${EXP_DEPTH}"]`)).not.toBeNull();
  expect(container.querySelector(`[name="${EXP_ITER}"]`)).not.toBeNull();
  expect(container.querySelector(`[name="${EXP_NONTERM}"]`)).not.toBeNull();
});

test('inputs use correct values', () => {
  const { container } = render(<Advanced open={false} setOpen={jest.fn()} />);
  expect(container.querySelector(`[name="${EXP_DEPTH}"]`)).toHaveValue(readMaxDepth());
  expect(container.querySelector(`[name="${EXP_ITER}"]`)).toHaveValue(readMaxIter());
  expect(container.querySelector(`[name="${EXP_NONTERM}"]`)).toHaveValue(readMaxNonTerms());
});

test('changing inputs changes values', () => {
  const { container } = render(<Advanced open={false} setOpen={jest.fn()} />);
  fireEvent.change(container.querySelector(`[name="${EXP_DEPTH}"]`)!, { target: { value: 10 } });
  fireEvent.change(container.querySelector(`[name="${EXP_ITER}"]`)!, { target: { value: 100 } });
  fireEvent.change(container.querySelector(`[name="${EXP_NONTERM}"]`)!, { target: { value: 52 } });
  expect(container.querySelector(`[name="${EXP_DEPTH}"]`)).toHaveValue(readMaxDepth());
  expect(container.querySelector(`[name="${EXP_ITER}"]`)).toHaveValue(readMaxIter());
  expect(container.querySelector(`[name="${EXP_NONTERM}"]`)).toHaveValue(readMaxNonTerms());
});

test('clearing removes from localstorage', () => {
  const { container } = render(<Advanced open={false} setOpen={jest.fn()} />);
  // put in localstorage
  fireEvent.change(container.querySelector(`[name="${EXP_DEPTH}"]`)!, { target: { value: 10 } });
  fireEvent.change(container.querySelector(`[name="${EXP_ITER}"]`)!, { target: { value: 100 } });
  fireEvent.change(container.querySelector(`[name="${EXP_NONTERM}"]`)!, { target: { value: 52 } });
  fireEvent.click(container.querySelector(`[name="${EXP_DEPTH}"]`)?.nextElementSibling!);
  fireEvent.click(container.querySelector(`[name="${EXP_ITER}"]`)?.nextElementSibling!);
  fireEvent.click(container.querySelector(`[name="${EXP_NONTERM}"]`)?.nextElementSibling!);
  expect(window.localStorage.getItem(EXP_DEPTH)).toBeNull();
  expect(window.localStorage.getItem(EXP_ITER)).toBeNull();
  expect(window.localStorage.getItem(EXP_NONTERM)).toBeNull();
});

test('clicking opener calls setOpen', () => {
  const mock = jest.fn();
  const { getByTestId } = render(<Advanced open={false} setOpen={mock} />);
  fireEvent.click(getByTestId('opener'));
  expect(mock).toHaveBeenCalledWith(true);
});

test('clicking opener calls setOpen when open', () => {
  const mock = jest.fn();
  const { getByTestId } = render(<Advanced open={true} setOpen={mock} />);
  fireEvent.click(getByTestId('opener'));
  expect(mock).toHaveBeenCalledWith(false);
});