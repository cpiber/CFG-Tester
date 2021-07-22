import { cleanup, render } from '@testing-library/react';
import React from 'react';
import Body from './Body';

jest.mock('./RulesInput', () => () => <div>##RULES##</div>);
jest.mock('./TextInput', () => () => <div>##TEXT##</div>);
jest.mock('./GrammarOutput', () => () => <div>##OUTPUT##</div>);

afterEach(cleanup);

test('uses class', () => {
  const classname = 'class';
  const { getByTestId } = render(<Body className={classname} />);
  expect(getByTestId('body')).toHaveClass(classname);
});

test('renders all three parts', () => {
  const { getByTestId } = render(<Body />);
  expect(getByTestId('body')).toHaveTextContent('##RULES##');
  expect(getByTestId('body')).toHaveTextContent('##TEXT##');
  expect(getByTestId('body')).toHaveTextContent('##OUTPUT##');
});