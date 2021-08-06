import { cleanup, fireEvent, getByTestId as globalGetByTestId, render, waitFor } from '@testing-library/react';
import React from 'react';
import ReactModal from 'react-modal';
import ReactTooltip from 'react-tooltip';
import Syntax from '../Logic/providers/syntaxes';
import Header from './Header';

const rebuildMock = ReactTooltip.rebuild as jest.Mock;
jest.mock('react-tooltip', () => {
  return {
    rebuild: jest.fn(),
  };
});

let container;
const renderTest = (props?: typeof Header extends (p: infer P) => any ? P : never) => {
  container = document.createElement('div');
  ReactModal.setAppElement(container);
  return render(
    <Syntax.Provider><Header {...props} /></Syntax.Provider>,
    { container }
  );
};

afterEach(cleanup);
afterEach(() => {
  ReactModal.setAppElement(undefined!);
});

test('respects className', () => {
  const className = 'class';
  const { getByTestId } = renderTest({ className });
  expect(getByTestId('header')).toHaveClass(className);
});

test('clicking cog opens modal', () => {
  const { getByTestId } = renderTest();
  expect(() => globalGetByTestId(document.body, 'modal')).toThrow();
  fireEvent.click(getByTestId('cog'));
  expect(() => globalGetByTestId(document.body, 'modal')).not.toThrow();
  fireEvent.click(globalGetByTestId(document.body, 'close'));
  expect(() => globalGetByTestId(document.body, 'modal')).toThrow();
});

test('opening modal rebuilds tooltips', async () => {
  const { getByTestId } = renderTest();
  fireEvent.click(getByTestId('cog'));
  await waitFor(() => expect(rebuildMock).toHaveBeenCalled());
});