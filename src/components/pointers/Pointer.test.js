import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  prettyDOM
} from 'react-testing-library';
import 'jest-dom/extend-expect';
import ShallowRenderer from 'react-test-renderer/shallow';
import Pointers from './Pointers';

function setup(props) {
  return render(<Pointers pointers={{ ...props }} />);
}

afterEach(cleanup);

describe('"amount" prop', () => {
  afterEach(cleanup);
  it('Should not render if "amount" prop is 0 or 1', () => {
    const { queryByTestId, rerender } = setup({ amount: 0 });

    expect(queryByTestId('cmp-pointers')).toBeFalsy();

    rerender(<Pointers pointers={{ amount: 1 }} />);

    expect(queryByTestId('cmp-pointers')).toBeFalsy();
  });

  it('Should render if "amount" prop is 2 or more', () => {
    const { getByTestId } = setup({ amount: 3 });

    expect(getByTestId('cmp-pointers')).toBeTruthy();
  });

  it('Should render as many pointers as "amount" prop specify', () => {
    const { getAllByRole } = setup({ amount: 6 });

    expect(getAllByRole('pointer ', { exact: false }).length).toBe(6);
  });
});

fdescribe('"currentPointer" prop', () => {
  afterEach(cleanup);

  function filterPointers(getAllByRole, pointerAt, result) {
    const pointers = getAllByRole('pointer ', { exact: false });
    const currentPointer = pointers[pointerAt]
      ? pointers[pointerAt]
      : { className: '' };

    expect(
      pointers.filter(
        pointer => pointer.className === currentPointer.className
      ).length
    ).toBe(result);
  }

  it('Should have only one current selected pointer', () => {
    const currentPointer = 1;
    const { getAllByRole } = setup({
      amount: 3,
      currentPointer
    });

    filterPointers(getAllByRole, currentPointer, 1);
  });

  it('Should not select / highlight any pointer if "currentPointer" isn\'t matching any pointer', () => {
    const currentPointer = 4;
    const { getAllByRole } = setup({
      amount: 3
    });

    filterPointers(getAllByRole, currentPointer, 0);
  });
});
