import { cleanup, render, fireEvent } from '@testing-library/react';
import { RadioButton, RadioGroup } from './Radio';

afterEach(cleanup);

test('renders radiogroup', () => {
  const { getByRole } = render(<RadioGroup />);
  expect(getByRole('radiogroup')).toBeDefined();
});

test('renders radiogroup with classname', () => {
  const classname = 'class';
  const { getByRole } = render(<RadioGroup className={classname} />);
  expect(getByRole('radiogroup')).toHaveClass(classname);
});

test('renders radio inputs', () => {
  const value1 = 'v1';
  const value2 = 'v2';
  const { getAllByRole } = render(<RadioGroup onChange={() => { /* */ }}><RadioButton value={value1} /><RadioButton value={value2} /></RadioGroup>);
  expect(getAllByRole('radio')).toHaveLength(2);
  expect(getAllByRole('radio')[0]).toHaveAttribute('value', value1);
  expect(getAllByRole('radio')[1]).toHaveAttribute('value', value2);
});

test('input with value checked', () => {
  const value1 = 'v1';
  const value2 = 'v2';
  const { getAllByRole } = render(<RadioGroup onChange={() => { /* */ }} value={value2}><RadioButton value={value1} /><RadioButton value={value2} /></RadioGroup>);
  expect(getAllByRole('radio')).toHaveLength(2);
  expect(getAllByRole('radio')[1]).toBeChecked();
});

test('change handler fires on radio element', () => {
  const mock = jest.fn((e: React.ChangeEvent) => e.target);
  const value1 = 'v1';
  const value2 = 'v2';
  const { getAllByRole } = render(<RadioGroup onChange={mock}><RadioButton value={value1} /><RadioButton value={value2} /></RadioGroup>);
  const e1 = getAllByRole('radio')[0];
  const e2 = getAllByRole('radio')[1];
  expect(getAllByRole('radio')).toHaveLength(2);
  fireEvent.click(e1);
  expect(mock).toHaveReturnedWith(e1);
  fireEvent.click(e2);
  expect(mock).toHaveReturnedWith(e2);
});