import { cleanup, render } from '@testing-library/react';
import React from 'react';
import App from './App';

jest.mock('./Body/Body', () => () => <div>##BODY##</div>);
jest.mock('./Header/Header', () => () => <div>##HEADER##</div>);
jest.mock('./Footer/Footer', () => () => <div>##FOOTER##</div>);

afterEach(cleanup);

test('renders all three parts', () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId('app')).toHaveTextContent('##BODY##');
  expect(getByTestId('app')).toHaveTextContent('##HEADER##');
  expect(getByTestId('app')).toHaveTextContent('##FOOTER##');
});