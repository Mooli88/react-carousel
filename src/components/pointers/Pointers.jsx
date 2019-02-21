import React from 'react';
import './Pointers.scss';

export default function Pointers(props) {
  const { currentPointer, onSelect } = props.pointers;
  const pointers = Array(props.pointers.amount).fill(null);

  if (!pointers.length) {
    return null;
  }

  return (
    <div>
      {pointers.map((pointer, i) => {
        const cls =
          currentPointer === i ? `pointer selected` : 'pointer';
        return (
          <span
            key={'pointer' + i}
            className={cls}
            onClick={_ => onSelect(i)}
          />
        );
      })}
    </div>
  );
}
