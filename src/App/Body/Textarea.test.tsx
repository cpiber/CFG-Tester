import { cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';
import Textarea from './Textarea';

afterEach(cleanup);

test('title exists if given and children are rendered', () => {
  const title = "title";
  const { getByTestId } = render(<Textarea title={title}><div data-testid="child" /></Textarea>);
  expect(getByTestId('label')).toHaveTextContent(title);
  expect(getByTestId('child')).toBeTruthy();
});

test('title doesn\'t exist if not given', () => {
  const { queryByTestId } = render(<Textarea />);
  expect(queryByTestId('label')).toBeNull();
});

test('ids are correctly set (generated)', () => {
  const { getByRole, getByTestId } = render(<Textarea title="title" />);
  const id = getByRole('textbox').id;
  expect(id).not.toBe('');
  expect(getByTestId('label')).toHaveAttribute('for', id);
});

test('ids are correctly set (given)', () => {
  const id = 'id';
  const { getByRole, getByTestId } = render(<Textarea title="title" id={id} />);
  expect(getByRole('textbox')).toHaveAttribute('id', id);
  expect(getByTestId('label')).toHaveAttribute('for', id);
});

test('attributes are set', () => {
  const className = "class",
    placeholder = "placeholder",
    value = "value",
    aria = "aria";
  const { getByTestId, getByRole } = render(<Textarea className={className} placeholder={placeholder} value={value} aria={aria} onChange={() => { /* */ }} />);
  expect(getByTestId('container')).toHaveClass(className);
  expect(getByRole('textbox')).toHaveAttribute('placeholder', placeholder);
  expect(getByRole('textbox')).toHaveAttribute('aria-label', aria);
  expect(getByRole('textbox')).toHaveValue(value);
});

test('changes are reported', () => {
  const mock = jest.fn((e: React.ChangeEvent) => (e.target as HTMLInputElement).value);
  const { getByRole } = render(<Textarea onChange={mock} />);
  const newval = 'test';
  fireEvent.change(getByRole('textbox'), { target: { value: newval } });
  expect(mock.mock.calls.length).toBe(1);
  expect(mock.mock.results[0].value).toBe(newval);
});