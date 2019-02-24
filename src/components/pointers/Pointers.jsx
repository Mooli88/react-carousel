import React from 'react';
import PropTypes from 'prop-types';
import './Pointers.scss';

export default function Pointers(props) {
  const { currentPointer, setCurrentPointer } = props.pointers;
  const pointers = Array(props.pointers.amount)
    .fill(null)
    .map((v, i) => i + 1);

  if (props.pointers.amount < 2) {
    return null;
  }

  return (
    <div data-testid="cmp-pointers">
      {pointers.map((pointer, i) => {
        const cls =
          currentPointer === i ? `pointer selected` : 'pointer';
        return (
          <span
            key={'pointer_' + i}
            role={'pointer ' + pointer}
            className={cls}
            onClick={_ => setCurrentPointer(i)}
          />
        );
      })}
    </div>
  );
}

Pointers.propTypes = {
  pointers: PropTypes.shape({
    currentPointer: PropTypes.number,
    setCurrentPointer: PropTypes.func
  }).isRequired
};
