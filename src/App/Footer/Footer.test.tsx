import { cleanup, render } from '@testing-library/react';
import React from 'react';

// jest.doMock('./data', () => ({
//   __esModule: true,
//   beginyear: process.env.REACT_APP_BEGIN_YEAR,
//   author: process.env.REACT_APP_AUTHOR,
//   source: process.env.REACT_APP_GITHUB_URL,
// }));

beforeEach(() => {
  jest.resetModules();
});

afterEach(cleanup);

test('uses class', async () => {
  jest.doMock('./data', () => ({
    __esModule: true,
  }));
  const { default: Footer } = await import('./Footer');
  const classname = 'class';
  const { getByTestId } = render(<Footer className={classname} />);
  expect(getByTestId('footer')).toHaveClass(classname);
});

test('no source - no divider and source block', async () => {
  jest.doMock('./data', () => ({
    __esModule: true,
  }));
  const { default: Footer } = await import('./Footer');
  const { getByTestId } = render(<Footer />);
  expect(getByTestId('footer')).not.toHaveTextContent(' :: ');
  expect(getByTestId('footer')).not.toHaveTextContent('Source');
});

test('source - has link', async () => {
  const source = 'http://localhost';
  jest.doMock('./data', () => ({
    __esModule: true,
    source,
  }));
  const { default: Footer } = await import('./Footer');
  const { getByTestId, getByText } = render(<Footer />);
  expect(getByTestId('footer')).toHaveTextContent(' :: ');
  expect(getByText('Source')).toHaveAttribute('href', source);
});

test('no beginyear, no author, no source - display just current year', async () => {
  jest.doMock('./data', () => ({
    __esModule: true,
  }));
  const { default: Footer } = await import('./Footer');
  const { getByTestId } = render(<Footer />);
  expect(getByTestId('footer').textContent).toBe((new Date()).getFullYear().toString());
});

test('author - display current year and author', async () => {
  const author = 'author';
  jest.doMock('./data', () => ({
    __esModule: true,
    author,
  }));
  const { default: Footer } = await import('./Footer');
  const { getByTestId } = render(<Footer />);
  expect(getByTestId('footer')).toHaveTextContent(`${(new Date()).getFullYear().toString()} by ${author}`);
});

test('beginyear - display start and current year', async () => {
  const beginyear = ((new Date()).getFullYear() - 1).toString();
  jest.doMock('./data', () => ({
    __esModule: true,
    beginyear,
  }));
  const { default: Footer } = await import('./Footer');
  const { getByTestId } = render(<Footer />);
  expect(getByTestId('footer').textContent).toBe(`${beginyear}-${(new Date()).getFullYear().toString()}`);
});
